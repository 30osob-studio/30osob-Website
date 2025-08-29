import type { RepoItem } from "../types/repos";
import Contributors from "./Contributors";
import Languages from "./Languages";

interface RepoProps {
  repo: RepoItem;
}

export default function Repo({ repo }: RepoProps) {
  return (
    <ul className="border-2 m-4 p-4 break-words">
      <p>{repo.name}</p>
      <p>{repo.html_url}</p>
      <p>{repo.description}</p>
      <p>{repo.readme}</p>
      <Languages languages={repo.languages} />
      <Contributors contributors={repo.contributors} />
    </ul>
  );
}
