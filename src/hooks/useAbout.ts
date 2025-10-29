import { useEffect, useState } from "react";
import type { AboutData } from "../types/about";
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

export function useAbout() {
    const [about, setAbout] = useState<AboutData | null>(null);
    const [fallbackText, setFallbackText] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const url = buildApiUrl("/about");

        fetchWithTimeout(url)
            .then(async (response) => {
                const text = await response.text();
                try {
                    const parsed = JSON.parse(text) as AboutData;
                    setAbout(parsed);
                } catch {
                    setAbout(null);
                    setFallbackText(text);
                }
            })
            .catch(() => {
                setAbout(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { about, fallbackText, isLoading };
}