import { useEffect, useState } from "react";
import type { ReposData } from "../types/repos";
import { buildApiUrl } from "../config";
import { useApiHealth } from "../context/ApiHealthContext";
import { getCachedData, setCachedData } from "../lib/cache";

const FETCH_TIMEOUT = 15000;
const CACHE_KEY = "ownerRepos";

function fetchWithTimeout(url: string, timeout: number = FETCH_TIMEOUT) {
    return Promise.race([
        fetch(url),
        new Promise<Response>((_, reject) =>
            setTimeout(() => reject(new Error("Fetch timeout")), timeout)
        ),
    ]);
}

export function useOwnerRepos() {
    const [repos, setRepos] = useState<ReposData | null>(null);
    const [fallbackText, setFallbackText] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const { isApiAvailable } = useApiHealth();

    useEffect(() => {
        const url = buildApiUrl("/owner/repos");

        if (isApiAvailable === null) {
            return;
        }

        if (!isApiAvailable) {
            const cached = getCachedData<ReposData>(CACHE_KEY);
            if (cached) {
                setRepos(cached);
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
                    const parsed = JSON.parse(text) as ReposData;
                    setRepos(parsed);
                    setCachedData(CACHE_KEY, parsed);
                } catch {
                    setRepos(null);
                    setFallbackText(text);
                }
            })
            .catch(() => {
                setRepos(null);
                const cached = getCachedData<ReposData>(CACHE_KEY);
                if (cached) {
                    setRepos(cached);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [isApiAvailable]);

    return { repos, fallbackText, isLoading };
}


