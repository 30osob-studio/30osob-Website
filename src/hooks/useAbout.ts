import { useEffect, useState } from "react";
import type { AboutData } from "../types/about";

export function useAbout() {
    const [about, setAbout] = useState<AboutData | null>(null);
    const [fallbackText, setFallbackText] = useState<string>("");

    useEffect(() => {
        const isLocalhost =
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1";
        const apiUrl = isLocalhost ? "/api/about" : "/api/proxy";

        fetch(apiUrl)
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