import type { RepoItem } from "../types/repos";
import Contributors from "./Contributors";
import Languages from "./Languages";

interface RepoProps {
  repo: RepoItem;
}

export default function Repo({ repo }: RepoProps) {
  return (
    <ul>
      <p>{repo.name}</p>
      <p>{repo.html_url}</p>
      <p>{repo.description}</p>
      <p>{repo.readme}</p>
      <Languages languages={repo.languages} />
      <Contributors contributors={repo.contributors} />
    </ul>
  );
}
