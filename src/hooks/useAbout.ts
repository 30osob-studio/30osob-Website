import { useEffect, useState } from "react";
import type { AboutData } from "../types/about";
import { buildApiUrl } from "../config";

export function useAbout() {
    const [about, setAbout] = useState<AboutData | null>(null);
    const [fallbackText, setFallbackText] = useState<string>("");

    useEffect(() => {
        const url = buildApiUrl("/about");

        fetch(url)
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
            });
    }, []);

    return { about, fallbackText };
}