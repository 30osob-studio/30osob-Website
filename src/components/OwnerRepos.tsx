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
    <>
      {repos.map((repo: RepoItem) => (
        <Repo key={repo.name} repo={repo} />
      ))}
    </>
  );
}


