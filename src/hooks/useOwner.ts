import { useEffect, useState } from "react";
import type { OwnerData } from "../types/owner";
import { buildApiUrl } from "../config";

export function useOwner() {
    const [owner, setOwner] = useState<OwnerData | null>(null);
    const [fallbackText, setFallbackText] = useState<string>("");

    useEffect(() => {
        const url = buildApiUrl("/owner");

        fetch(url)
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
            });
    }, []);

    return { owner, fallbackText };
}


