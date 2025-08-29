import { useRepos } from "../hooks/useRepos";
import Repo from "./Repo";

export default function Repos() {
  const { repos, fallbackText } = useRepos();

  if (!repos) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <div className="border-2 m-4 p-4 break-words">
      {repos.map((repo) => (
        <Repo key={repo.name} repo={repo} />
      ))}
    </div>
  );
}
