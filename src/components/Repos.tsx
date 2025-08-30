import { useRepos } from "../hooks/useRepos";
import Repo from "./Repo";

export default function Repos() {
  const { repos, fallbackText } = useRepos();

  if (!repos) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <div className="flex flex-row w-scroll p-4 bg-[rgba(6,18,28,1)] break-words overflow-x-auto">
      {repos.map((repo) => (
        <Repo key={repo.name} repo={repo} />
      ))}
    </div>
  );
}
