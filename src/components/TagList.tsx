import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { RepoLanguages } from "../types/repos";

interface TagListProps {
  items: string[] | RepoLanguages;
  tagClassName?: string;
}

export default function TagList({ items, tagClassName = "bg-white text-black" }: TagListProps) {
  // Handle RepoLanguages (object) - extract keys
  const tagArray = Array.isArray(items) ? items : Object.keys(items);
  const containerRef = useRef<HTMLDivElement>(null);
  const plusButtonRef = useRef<HTMLDivElement>(null);
  const measuringContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tagWidthsRef = useRef<number[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(tagArray.length);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!measuringContainerRef.current) return;

    tagWidthsRef.current = Array.from(measuringContainerRef.current.children).map(
      (child) => (child as HTMLDivElement).offsetWidth
    );

    calculateVisibleTags();
  }, [tagArray]);

  const calculateVisibleTags = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const gap = 10;
    let totalWidth = 0;
    let count = 0;

    for (let i = 0; i < tagWidthsRef.current.length; i++) {
      const tagWidth = tagWidthsRef.current[i] + gap;
      
      const plusButtonWidth = i < tagArray.length - 1 ? 50 : 0;
      
      if (totalWidth + tagWidth + plusButtonWidth <= containerWidth) {
        totalWidth += tagWidth;
        count++;
      } else {
        break;
      }
    }

    setVisibleCount(Math.max(1, count));
  };

  useEffect(() => {
    calculateVisibleTags();
    const resizeObserver = new ResizeObserver(calculateVisibleTags);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [tagArray.length]);

  if (!tagArray || tagArray.length === 0) {
    return null;
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        plusButtonRef.current &&
        !plusButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleScroll, true);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("scroll", handleScroll, true);
      };
    }
  }, [isOpen]);

  const visibleTags = tagArray.slice(0, visibleCount);
  const hiddenTags = tagArray.slice(visibleCount);
  const hasHiddenTags = hiddenTags.length > 0;

  return (
    <>
      <div
        ref={measuringContainerRef}
        className="flex flex-row gap-2.5 flex-nowrap absolute -left-full"
        aria-hidden="true"
      >
        {tagArray.map((tag) => (
          <div
            key={`measure-${tag}`}
            className={`flex items-center lato-bold justify-center rounded-full ${tagClassName} py-1 px-3 border-2 border-blck text-sm flex-shrink-0`}
          >
            {tag}
          </div>
        ))}
      </div>

      <div className="flex flex-row gap-2.5 flex-nowrap overflow-hidden" ref={containerRef}>
        {visibleTags.map((tag) => (
          <div
            key={tag}
            className={`flex items-center lato-bold justify-center rounded-full ${tagClassName} py-1 px-3 border-2 border-blck text-sm flex-shrink-0`}
          >
            {tag}
          </div>
        ))}
        
        {hasHiddenTags && (
          <div className="relative">
            <div
              ref={plusButtonRef}
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center lato-bold justify-center rounded-full ${tagClassName} py-1 px-3 border-2 border-blck text-sm flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity active:scale-95`}
            >
              +{hiddenTags.length}
            </div>
            
            {isOpen &&
              createPortal(
                <div
                  ref={dropdownRef}
                  className="fixed bg-white text-black rounded-md shadow-lg border-2 border-black z-50 p-2 max-w-xs"
                  style={{
                    top: `${plusButtonRef.current?.getBoundingClientRect().top}px`,
                    left: `${plusButtonRef.current?.getBoundingClientRect().right}px`,
                  }}
                >
                  <div className="flex flex-col gap-2">
                    {hiddenTags.map((tag) => (
                      <div
                        key={tag}
                        className={`flex items-center lato-bold justify-center rounded-full ${tagClassName} py-1 px-3 border-2 border-blck text-sm`}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>,
                document.body
              )}
          </div>
        )}
      </div>
    </>
  );
}