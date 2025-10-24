import { useRepos } from "./useRepos";
import { useOwnerRepos } from "./useOwnerRepos";
import type { RepoItem } from "../types/repos";

export function useAllRepos() {
    const { repos: commonRepos, fallbackText: commonFallback } = useRepos();
    const { repos: ownerRepos, fallbackText: ownerFallback } = useOwnerRepos();

    // Kombinuj obie listy
    const allRepos: RepoItem[] = [
        ...(commonRepos || []),
        ...(ownerRepos || [])
    ];

    // Deduplikuj po nazwie
    const uniqueRepos = Array.from(
        new Map(allRepos.map(repo => [repo.name, repo])).values()
    );

    return {
        repos: uniqueRepos,
        fallbackText: commonFallback || ownerFallback
    };
}