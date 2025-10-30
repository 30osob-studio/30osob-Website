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

function sanitizeAboutData(data: any): AboutData {
    return {
        avatar_url: (data.avatar_url && typeof data.avatar_url === "string") ? data.avatar_url.trim() : "",
        description: (data.description && typeof data.description === "string") ? data.description.trim() : "",
        name: (data.name && typeof data.name === "string") ? data.name.trim() : "",
        location: (data.location && typeof data.location === "string") ? data.location.trim() : "",
        email: (data.email && typeof data.email === "string") ? data.email.trim() : "",
        twitter_username: (data.twitter_username && typeof data.twitter_username === "string") ? data.twitter_username.trim() : null,
        public_repos: (typeof data.public_repos === "number") ? data.public_repos : 0,
        html_url: (data.html_url && typeof data.html_url === "string") ? data.html_url.trim() : "",
        readme: (data.readme && typeof data.readme === "string") ? data.readme.trim() : "",
    };
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
                    const parsed = JSON.parse(text);
                    const sanitized = sanitizeAboutData(parsed);
                    setAbout(sanitized);
                    setCachedData(CACHE_KEY, sanitized);
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