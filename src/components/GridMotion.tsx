import { useEffect, useRef, useMemo, useState, type FC } from "react";
import type { JSX } from "react";
import { gsap } from "gsap";

interface ResponsiveSpeed {
  mobile?: number;
  tablet?: number;
  desktop?: number;
}

interface ResponsiveSize {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}

interface GridMotionProps {
  items?: (string | JSX.Element)[];
  gradientColor?: string;
  speed?: number;
  responsiveSpeed?: ResponsiveSpeed;
  itemWidth?: string;
  itemHeight?: string;
  responsiveWidth?: ResponsiveSize;
  responsiveHeight?: ResponsiveSize;
}

const GridMotion: FC<GridMotionProps> = ({
  items = [],
  speed = 0.1,
  responsiveSpeed,
  itemWidth = "30vw",
  itemHeight = "30vw",
  responsiveWidth,
  responsiveHeight,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  const getResponsiveValue = (
    windowWidth: number,
    responsiveConfig?: ResponsiveSize,
    defaultValue?: string
  ): string => {
    if (!responsiveConfig) return defaultValue || "30vw";

    // Mobile: < 768px
    if (windowWidth < 768 && responsiveConfig.mobile !== undefined) {
      return responsiveConfig.mobile;
    }
    // Tablet: 768px - 1024px
    if (windowWidth < 1024 && responsiveConfig.tablet !== undefined) {
      return responsiveConfig.tablet;
    }
    // Desktop: >= 1024px
    if (responsiveConfig.desktop !== undefined) {
      return responsiveConfig.desktop;
    }

    return defaultValue || "30vw";
  };

  const getResponsiveSpeed = (width: number): number => {
    if (!responsiveSpeed) return speed;

    // Mobile: < 768px
    if (width < 768 && responsiveSpeed.mobile !== undefined) {
      return responsiveSpeed.mobile;
    }
    // Tablet: 768px - 1024px
    if (width < 1024 && responsiveSpeed.tablet !== undefined) {
      return responsiveSpeed.tablet;
    }
    // Desktop: >= 1024px
    if (responsiveSpeed.desktop !== undefined) {
      return responsiveSpeed.desktop;
    }

    return speed;
  };

  const totalRows = 4;
  const defaultItems = Array.from(
    { length: totalRows },
    (_, index) => `Item ${index + 1}`
  );
  const sourceItems = items.length > 0 ? items : defaultItems;

  const expandedItems = useMemo(() => {
    const expanded = Array(8)
      .fill(null)
      .flatMap(() => sourceItems);
    return expanded;
  }, [sourceItems]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handleResize = () => {
      const currentSpeed = getResponsiveSpeed(windowWidth);
      
      rowRefs.current.forEach((row, rowIndex) => {
        if (!row) return;

        const firstItem = row.firstElementChild as HTMLElement;
        if (!firstItem) return;

        const itemWidth = firstItem.offsetWidth + 16;
        const oneSetWidth = sourceItems.length * itemWidth;
        const direction = rowIndex % 2 === 0 ? -1 : 1;

        gsap.killTweensOf(row);

        gsap.to(row, {
          x: oneSetWidth * direction * -1,
          duration: sourceItems.length / currentSpeed,
          ease: "none",
          repeat: -1,
        });
      });
    };

    setTimeout(handleResize, 0);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      rowRefs.current.forEach((row) => {
        if (row) gsap.killTweensOf(row);
      });
    };
  }, [sourceItems.length, speed, responsiveSpeed, itemWidth, itemHeight, responsiveWidth, responsiveHeight, windowWidth]);

  const currentWidth = getResponsiveValue(windowWidth, responsiveWidth, itemWidth);
  const currentHeight = getResponsiveValue(windowWidth, responsiveHeight, itemHeight);

  return (
    <div ref={gridRef} className="h-full w-full overflow-hidden">
      <section
        className="w-full h-full overflow-hidden relative flex items-center justify-center"
        style={{
          background: "transparent",
        }}
      >
        <div className="absolute inset-0 pointer-events-none z-[4] bg-[length:250px]"></div>
        <div className="flex flex-col gap-4 md:gap-6 relative z-[2] h-full justify-center rotate-[-15deg] origin-center">
          {Array.from({ length: totalRows }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-4 md:gap-6 items-center"
              style={{
                willChange: "transform, filter",
              }}
              ref={(el) => {
                if (el) rowRefs.current[rowIndex] = el;
              }}
            >
              {expandedItems.map((content, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex-shrink-0"
                  style={{
                    width: currentWidth,
                    height: currentHeight,
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-[10px] md:rounded-[15px] bg-[#111] flex items-center justify-center text-white text-xs sm:text-sm md:text-base">
                    {typeof content === "string" &&
                    content.startsWith("http") ? (
                      <div
                        className="w-full h-full bg-cover bg-center absolute top-0 left-0"
                        style={{ backgroundImage: `url(${content})` }}
                      ></div>
                    ) : (
                      <div className="p-2 sm:p-4 text-center z-[1]">
                        {content}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="relative w-full h-full top-0 left-0 pointer-events-none"></div>
      </section>
    </div>
  );
};

export default GridMotion;
