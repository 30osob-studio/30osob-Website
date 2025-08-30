import type { JSX } from "react";
import { useOwnerRepos } from "../hooks/useOwnerRepos";
import type { RepoItem } from "../types/repos";
import Repo from "./Repo";

export default function OwnerRepos(): JSX.Element {
  const { repos, fallbackText } = useOwnerRepos();

  if (!repos) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <div className="flex flex-row w-full p-4 bg-[rgba(6,18,28,1)] break-words overflow-x-auto">
      {repos.map((repo: RepoItem) => (
        <Repo key={repo.name} repo={repo} />
      ))}
    </div>
  );
}
