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
    <div className="border-2 m-4 p-4">
      {repos.map((repo: RepoItem) => (
        <Repo key={repo.name} repo={repo} />
      ))}
    </div>
  );
}
