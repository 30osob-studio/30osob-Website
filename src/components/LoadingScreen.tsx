import { useEffect, useState } from "react";

interface LoadingScreenProps {
  isVisible: boolean;
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const [opacity, setOpacity] = useState(isVisible ? 1 : 0);
  const [pointerEvents, setPointerEvents] = useState<React.CSSProperties['pointerEvents']>(isVisible ? "auto" : "none");

  useEffect(() => {
    if (isVisible) {
      setOpacity(1);
      setPointerEvents("auto");
    } else {
      setOpacity(0);
      const timer = setTimeout(() => {
        setPointerEvents("none");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-500"
      style={{ opacity, pointerEvents }}
      aria-label="Loading"
    >
      <style>{`
        @keyframes spin-smooth {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse-text {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
        .loading-logo {
          animation: spin-smooth 3s linear infinite;
        }
        .loading-text {
          animation: pulse-text 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="flex flex-col items-center gap-[10vw]">
        <img 
          src="/logo.svg" 
          alt="Loading" 
          className="loading-logo w-[40vw] h-[40vw] lg:w-[20vw] lg:h-[20vw]"
        />
        
        <p className="loading-text text-white text-[8vw] lg:text-[2vw] lato-bold tracking-widest">
          Loading...
        </p>
      </div>
    </div>
  );
}