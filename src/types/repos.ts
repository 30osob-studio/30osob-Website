export interface RepoContributor {
    login: string;
    avatar_url: string;
    html_url: string;
}

export interface RepoLanguages {
    [languageName: string]: number;
}

export interface RepoItem {
    name: string;
    html_url: string;
    description: string | null;
    created_at: Date;
    updated_at: string;
    pushed_at: string;
    topics: string[];
    homepage: string | null;
    open_issues_count: number;
    default_branch: string;
    license: unknown | null;
    contributors: RepoContributor[];
    languages: RepoLanguages;
    readme: string | null;
}

export type ReposData = RepoItem[];