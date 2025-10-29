import { useEffect, useState } from "react";
import type { ReposData } from "../types/repos";
import { buildApiUrl } from "../config";

const FETCH_TIMEOUT = 15000; // 15 seconds

function fetchWithTimeout(url: string, timeout: number = FETCH_TIMEOUT) {
    return Promise.race([
        fetch(url),
        new Promise<Response>((_, reject) =>
            setTimeout(() => reject(new Error("Fetch timeout")), timeout)
        ),
    ]);
}

export function useRepos() {
    const [repos, setRepos] = useState<ReposData | null>(null);
    const [fallbackText, setFallbackText] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const url = buildApiUrl("/repos");

        fetchWithTimeout(url)
            .then(async (response) => {
                const text = await response.text();
                try {
                    const parsed = JSON.parse(text) as ReposData;
                    setRepos(parsed);
                } catch {
                    setRepos(null);
                    setFallbackText(text);
                }
            })
            .catch(() => {
                setRepos(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { repos, fallbackText, isLoading };
}