import { useEffect, useState } from "react";
import type { OwnerData } from "../types/owner";
import { buildApiUrl } from "../config";

const FETCH_TIMEOUT = 15000;

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

    useEffect(() => {
        const url = buildApiUrl("/owner");

        fetchWithTimeout(url)
            .then(async (response) => {
                const text = await response.text();
                try {
                    const parsed = JSON.parse(text) as OwnerData;
                    setOwner(parsed);
                } catch {
                    setOwner(null);
                    setFallbackText(text);
                }
            })
            .catch(() => {
                setOwner(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return { owner, fallbackText, isLoading };
}


