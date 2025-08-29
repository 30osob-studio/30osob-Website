import { useEffect, useState } from "react";
import type { ReposData } from "../types/repos";
import { buildApiUrl } from "../config";

export function useRepos() {
    const [repos, setRepos] = useState<ReposData | null>(null);
    const [fallbackText, setFallbackText] = useState<string>("");

    useEffect(() => {
        const url = buildApiUrl("/owner/repos");

        fetch(url)
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
            });
    }, []);

    return { repos, fallbackText };
}