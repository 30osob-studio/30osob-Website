import { useEffect, useState } from "react";
import { useApiHealth } from "../context/ApiHealthContext";

interface LoadingScreenProps {
  isVisible: boolean;
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const [opacity, setOpacity] = useState(isVisible ? 1 : 0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [dotsCycle, setDotsCycle] = useState(0);
  const [pointerEvents, setPointerEvents] = useState<React.CSSProperties['pointerEvents']>(isVisible ? "auto" : "none");
  const { isApiAvailable } = useApiHealth();

  const dotsSequence = [1, 2, 3, 2];
  const dotsCount = dotsSequence[dotsCycle % 4];

  let logoColor = "#ffffff";
  let loadingTextBase = "Loading";
  let textColor = "text-white";
  
  if (isApiAvailable === true) {
    logoColor = "#22c55e";
    loadingTextBase = "Loading from API";
    textColor = "text-green-500";

  } else if (isApiAvailable === false) {
    logoColor = "#f97316";
    loadingTextBase = "Loading from cache";
    textColor = "text-orange-500";
  }

  useEffect(() => {
    if (isVisible) {
      setOpacity(1);
      setPointerEvents("auto");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      setOpacity(0);
      const timer = setTimeout(() => {
        setPointerEvents("none");
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    setTextOpacity(0);
    const timer = setTimeout(() => {
      setTextOpacity(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [isApiAvailable]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotsCycle((prev) => prev + 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

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

      <div className="flex flex-col items-center gap-[10vh]">
        <img 
          src="/logo.svg" 
          alt="Loading" 
          className="loading-logo w-[40vw] h-[40vw] lg:w-[20vw] lg:h-[20vw]"
          style={{
            filter: logoColor === "#ffffff" ? "none" : `drop-shadow(0 0 10px ${logoColor}) drop-shadow(0 0 10px ${logoColor})`,
            transition: "filter 0.3s ease",
          }}
        />
        
        <p 
          className={`loading-text ${textColor} text-center text-[25px] lato-bold tracking-widest`}
          style={{ opacity: textOpacity, transition: "opacity 0.3s ease-in-out" }}
        >
          {loadingTextBase}{".".repeat(dotsCount)}
        </p>
      </div>
    </div>
  );
}