import { useEffect, useState } from "react";
import type { AboutData } from "../types/about";
import { buildApiUrl } from "../config";
import { useApiHealth } from "../context/ApiHealthContext";
import { getCachedData, setCachedData } from "../lib/cache";

const FETCH_TIMEOUT = 15000;
const CACHE_KEY = "about";

function fetchWithTimeout(url: string, timeout: number = FETCH_TIMEOUT) {
    return Promise.race([
        fetch(url),
        new Promise<Response>((_, reject) =>
            setTimeout(() => reject(new Error("Fetch timeout")), timeout)
        ),
    ]);
}

export function useAbout() {
    const [about, setAbout] = useState<AboutData | null>(null);
    const [fallbackText, setFallbackText] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const { isApiAvailable } = useApiHealth();

    useEffect(() => {
        const url = buildApiUrl("/about");

        if (isApiAvailable === null) {
            return;
        }

        if (!isApiAvailable) {
            const cached = getCachedData<AboutData>(CACHE_KEY);
            if (cached) {
                setAbout(cached);
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
                    const parsed = JSON.parse(text) as AboutData;
                    setAbout(parsed);
                    setCachedData(CACHE_KEY, parsed);
                } catch {
                    setAbout(null);
                    setFallbackText(text);
                }
            })
            .catch(() => {
                setAbout(null);
                const cached = getCachedData<AboutData>(CACHE_KEY);
                if (cached) {
                    setAbout(cached);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [isApiAvailable]);

    return { about, fallbackText, isLoading };
}