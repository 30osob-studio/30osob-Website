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

function sanitizeOwnerData(data: any): OwnerData {
    return {
        avatar_url: (data.avatar_url && typeof data.avatar_url === "string") ? data.avatar_url.trim() : "",
        html_url: (data.html_url && typeof data.html_url === "string") ? data.html_url.trim() : "",
        name: (data.name && typeof data.name === "string") ? data.name.trim() : "",
        company: (data.company && typeof data.company === "string") ? data.company.trim() : "",
        location: (data.location && typeof data.location === "string") ? data.location.trim() : "",
        email: (data.email && typeof data.email === "string") ? data.email.trim() : "",
        bio: (data.bio && typeof data.bio === "string") ? data.bio.trim() : "",
        twitter_username: (data.twitter_username && typeof data.twitter_username === "string") ? data.twitter_username.trim() : "",
        public_repos: (typeof data.public_repos === "number") ? data.public_repos : 0,
        readme: (data.readme && typeof data.readme === "string") ? data.readme.trim() : "",
    };
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
                    const parsed = JSON.parse(text);
                    const sanitized = sanitizeOwnerData(parsed);
                    setOwner(sanitized);
                    setCachedData(CACHE_KEY, sanitized);
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


