import { useEffect, useState } from "react";
import type { ReposData, RepoItem } from "../types/repos";
import { buildApiUrl } from "../config";
import { useApiHealth } from "../context/ApiHealthContext";
import { getCachedData, setCachedData } from "../lib/cache";

const FETCH_TIMEOUT = 15000;
const CACHE_KEY = "repos";

function fetchWithTimeout(url: string, timeout: number = FETCH_TIMEOUT) {
    return Promise.race([
        fetch(url),
        new Promise<Response>((_, reject) =>
            setTimeout(() => reject(new Error("Fetch timeout")), timeout)
        ),
    ]);
}

function sanitizeRepoData(repos: unknown[]): RepoItem[] {
    return repos.map((repo: any) => ({
        name: (repo.name && typeof repo.name === "string") ? repo.name.trim() : "",
        html_url: (repo.html_url && typeof repo.html_url === "string") ? repo.html_url.trim() : "",
        description: (repo.description && typeof repo.description === "string") ? repo.description.trim() : null,
        created_at: (repo.created_at && typeof repo.created_at === "string") ? repo.created_at.trim() : "",
        updated_at: (repo.updated_at && typeof repo.updated_at === "string") ? repo.updated_at.trim() : "",
        pushed_at: (repo.pushed_at && typeof repo.pushed_at === "string") ? repo.pushed_at.trim() : "",
        topics: Array.isArray(repo.topics) ? repo.topics.filter((t: any) => typeof t === "string" && t.trim().length > 0) : [],
        homepage: (repo.homepage && typeof repo.homepage === "string") ? repo.homepage.trim() : null,
        open_issues_count: (typeof repo.open_issues_count === "number") ? repo.open_issues_count : 0,
        default_branch: (repo.default_branch && typeof repo.default_branch === "string") ? repo.default_branch.trim() : "",
        license: repo.license ?? null,
        contributors: Array.isArray(repo.contributors) ? repo.contributors.filter((c: any) => c && typeof c === "object") : [],
        languages: repo.languages && typeof repo.languages === "object" ? repo.languages : {},
        readme: (repo.readme && typeof repo.readme === "string") ? repo.readme.trim() : null,
        repo_image: (repo.repo_image && typeof repo.repo_image === "string") ? repo.repo_image.trim() : null,
    }));
}

export function useRepos() {
    const [repos, setRepos] = useState<ReposData | null>(null);
    const [fallbackText, setFallbackText] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const { isApiAvailable } = useApiHealth();

    useEffect(() => {
        const url = buildApiUrl("/repos");

        if (isApiAvailable === null) {
            return;
        }

        if (!isApiAvailable) {
            const cached = getCachedData<ReposData>(CACHE_KEY);
            if (cached) {
                setRepos(cached);
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
                    const sanitized = sanitizeRepoData(Array.isArray(parsed) ? parsed : []);
                    setRepos(sanitized);
                    setCachedData(CACHE_KEY, sanitized);
                } catch {
                    setRepos(null);
                    setFallbackText(text);
                }
            })
            .catch(() => {
                setRepos(null);
                const cached = getCachedData<ReposData>(CACHE_KEY);
                if (cached) {
                    setRepos(cached);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [isApiAvailable]);

    return { repos, fallbackText, isLoading };
}