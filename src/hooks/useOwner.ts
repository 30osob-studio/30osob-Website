import { useEffect, useState } from "react";
import type { OwnerData } from "../types/owner";
import { buildApiUrl } from "../config";
import { useApiHealth } from "../context/ApiHealthContext";
import { getCachedData, setCachedData } from "../lib/cache";

const FETCH_TIMEOUT = 15000;
const CACHE_KEY = "owner";

function fetchWithTimeout(url: string, timeout: number = FETCH_TIMEOUT) {
    return Promise.race([
        fetch(url),
        new Promise<Response>((_, reject) =>
            setTimeout(() => reject(new Error("Fetch timeout")), timeout)
        ),
    ]);
}

export function useOwner() {
    const [owner, setOwner] = useState<OwnerData | null>(null);
    const [fallbackText, setFallbackText] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const { isApiAvailable } = useApiHealth();

    useEffect(() => {
        const url = buildApiUrl("/owner");

        if (isApiAvailable === null) {
            return;
        }

        if (!isApiAvailable) {
            const cached = getCachedData<OwnerData>(CACHE_KEY);
            if (cached) {
                setOwner(cached);
                setTimeout(() => {
                    setIsLoading(false);
                }, 150);
            } else {
                setIsLoading(false);
            }
            return;
        }

        fetchWithTimeout(url)
            .then(async (response) => {
                const text = await response.text();
                try {
                    const parsed = JSON.parse(text) as OwnerData;
                    setOwner(parsed);
                    setCachedData(CACHE_KEY, parsed);
                } catch {
                    setOwner(null);
                    setFallbackText(text);
                }
            })
            .catch(() => {
                setOwner(null);
                const cached = getCachedData<OwnerData>(CACHE_KEY);
                if (cached) {
                    setOwner(cached);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [isApiAvailable]);

    return { owner, fallbackText, isLoading };
}


