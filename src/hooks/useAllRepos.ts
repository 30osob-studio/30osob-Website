import { useEffect, useState, useMemo } from "react";
import type { ReposData } from "../types/repos";
import { buildApiUrl } from "../config";

export function useAllRepos() {
    const [allRepos, setAllRepos] = useState<ReposData | null>(null);
    const [fallbackText, setFallbackText] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllRepos = async () => {
            try {
                setIsLoading(true);
                
                // Pobierz oba endpointy równocześnie
                const [reposResponse, ownerReposResponse] = await Promise.all([
                    fetch(buildApiUrl("/repos")),
                    fetch(buildApiUrl("/owner/repos")),
                ]);

                const reposText = await reposResponse.text();
                const ownerReposText = await ownerReposResponse.text();

                try {
                    const repos = JSON.parse(reposText) as ReposData;
                    const ownerRepos = JSON.parse(ownerReposText) as ReposData;
                    
                    // Połącz obie listy
                    const combined = [...repos, ...ownerRepos];
                    setAllRepos(combined);
                } catch {
                    setAllRepos(null);
                    setFallbackText(reposText || ownerReposText);
                }
            } catch {
                setAllRepos(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllRepos();
    }, []);

    // Filtruj tylko repozytoria które mają repo_image i zwróć je jako stringi URL
    const repoImages = useMemo(() => {
        if (!allRepos) return [];
        return allRepos
            .filter(repo => repo.repo_image)
            .map(repo => repo.repo_image as string);
    }, [allRepos]);

    return { allRepos, repoImages, fallbackText, isLoading };
}