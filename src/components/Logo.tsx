import { useEffect, useState } from "react";
import MetallicPaint, { parseLogoImage } from "./MetallicPaint";
import { LogoIcon } from "./icons";

// Generate SVG string from LogoIcon for MetallicPaint processing
function getLogoSvgString(): string {
  return `<svg width="750" height="750" viewBox="0 0 750 750" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>.cls-1 { fill: white; }</style>
    </defs>
    <path
      className="cls-1"
      d="M749.93,369.44c0-1.13-.04-2.26-.07-3.36,0-.26,0-.47-.04-.73-.04-1.24-.07-2.48-.14-3.68v-.33c0-.77-.04-1.53-.11-2.3C741.45,159.33,581.35,0,385.06,0c-125.67,0-236.57,65.33-302.16,164.84l-.92,1.09c-.11.15-.21.29-.25.44l-.14.18-.25.29c-.53.62-.96,1.31-1.24,2.01-.04.07-.07.15-.11.22-2.06,5.11,1.49,11.31,7.42,11.31h347.37c.82-.04,1.63-.04,2.45-.04s1.63,0,2.45.04c99.12,1.28,179.97,80.39,187.35,180.67.35,4.92.53,9.89.53,14.92s-.18,9.89-.57,14.77c-.11,1.57-.25,3.17-.39,4.74-.32,3.1-.67,6.2-1.14,9.3v.04c-13.7,94.22-92.77,166.48-188.24,166.48H87.66c-4.76,0-7.99,4.01-7.99,8.28,0,.11,0,.18.04.29v.04c-.04.11,0,.22.04.33v.04c.11,1.53.67,3.1,1.74,4.45,2.16,2.77,4.37,5.51,6.64,8.17,66.15,95.13,174.5,157.11,296.94,157.11,189.69,0,345.56-148.75,363.2-338.98,0-.15.04-.29.04-.44.07-.55.11-1.09.14-1.6.14-1.71.32-3.47.43-5.18.07-.69.14-1.39.18-2.08.21-2.52.35-5.03.46-7.59.18-2.74.28-5.47.35-8.24.04-1.17.07-2.33.07-3.5.04-2.15.07-4.27.07-6.42s-.04-4.34-.07-6.53Z"
    />
    <path
      className="cls-1"
      d="M154.06,494.07c39.36-2.99,71.45-35.57,74.78-75.99,3.8-46.28-29.4-85.65-72.51-90.22-.26-.03-.52-.04-.78-.04h-4.5c-4.96,0-8.06-5.52-5.58-9.94l29.35-52.25c2.48-4.42-.62-9.94-5.58-9.94H23.81c-2.69,0-5.13,1.71-6.06,4.3C5.96,292.76,0,327.17,0,362.63c0,17.83,1.55,35.72,4.6,53.12.55,3.15,3.22,5.45,6.34,5.45h50.36c3.04,0,5.63,2.17,6.29,5.22.33,1.52.74,3.19,1.23,4.96,6.02,21.74,18.64,35.18,21.07,37.76,16.05,16.91,39.01,26.84,64.16,24.93Z"
    />
    <ellipse className="cls-1" cx="414.7" cy="375" rx="116.19" ry="119.42" />
  </svg>`;
}

export default function Logo() {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const svgString = getLogoSvgString();
        const { imageData: parsedImageData } = await parseLogoImage(svgString);
        setImageData(parsedImageData);
      } catch (error) {
        console.error("Failed to load logo:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLogo();
  }, []);

  if (loading || !imageData) {
    return (
      <div className="w-full h-40 flex items-center justify-center">
        <div className="text-white">Loading logo...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-40 h-40">
        {/* <LogoIcon
          size={160}
          color="#000000"
          className="w-full h-full opacity-100"
        /> */}
        <div className="absolute inset-0 z-10">
          <MetallicPaint imageData={imageData} />
        </div>
      </div>
    </div>
  );
}
