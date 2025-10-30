import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { buildApiUrl } from "../config";

interface ApiHealthContextType {
  isApiAvailable: boolean | null;
  isChecking: boolean;
}

const ApiHealthContext = createContext<ApiHealthContextType | undefined>(undefined);

const HEALTH_CHECK_TIMEOUT = 5000;

function checkApiHealth(): Promise<boolean> {
  return Promise.race([
    fetch(buildApiUrl("/about"), { method: "HEAD" })
      .then((response) => response.ok)
      .catch(() => false),
    new Promise<boolean>((resolve) =>
      setTimeout(() => resolve(false), HEALTH_CHECK_TIMEOUT)
    ),
  ]);
}

export function ApiHealthProvider({ children }: { children: ReactNode }) {
  const [isApiAvailable, setIsApiAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      const available = await checkApiHealth();
      setIsApiAvailable(available);
      setIsChecking(false);
    };

    checkHealth();
  }, []);

  return (
    <ApiHealthContext.Provider value={{ isApiAvailable, isChecking }}>
      {children}
    </ApiHealthContext.Provider>
  );
}

export function useApiHealth() {
  const context = useContext(ApiHealthContext);
  if (context === undefined) {
    throw new Error("useApiHealth must be used within ApiHealthProvider");
  }
  return context;
}