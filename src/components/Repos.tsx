import { useRepos } from "../hooks/useRepos";
import Repo from "./Repo";

export default function Repos() {
  const { repos, fallbackText } = useRepos();

  if (!repos) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <div className="flex flex-row overflow-auto w-full p-4 bg-[rgba(6,18,28,1)]  break-words">
      {repos.map((repo) => (
        <Repo key={repo.name} repo={repo} />
      ))}
    </div>
  );
}
