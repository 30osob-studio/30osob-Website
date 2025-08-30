import type { RepoItem } from "../types/repos";
import Contributors from "./Contributors";
import Languages from "./Languages";
import { LinkIcon, GitHubIcon } from "../components/icons";

interface RepoProps {
  repo: RepoItem;
}

export default function Repo({ repo }: RepoProps) {
  return (
    <div className="m-4 p-4 bg-green-500 break-words">
      <p className="bg-yellow-500">{repo.readme}</p>
      <p className="bg-blue-300">{repo.name}</p>
      <a
        className="bg-pink-500"
        href={repo.html_url ?? undefined}
        target="_blank"
      >
        <GitHubIcon size={24} color="white"></GitHubIcon>
      </a>
      <p>{repo.description}</p>
      <p>{repo.created_at}</p>
      <p>{repo.updated_at}</p>
      <p>{repo.pushed_at}</p>
      <div className="bg-blue-500 flex flex-row gap-4 p-4">
        {repo.topics.map((topic) => (
          <div
            key={topic}
            className="flex items-center justify-center rounded-full bg-black text-white py-0.5 px-3 border-2 border-white pb-1"
          >
            {topic}
          </div>
        ))}
      </div>

      <a
        className="bg-pink-500"
        href={repo.homepage ?? undefined}
        target="_blank"
      >
        <LinkIcon size={24} color="white"></LinkIcon>
      </a>

      {/* <p>{repo.open_issues_count}</p> */}
      {/* <p>{repo.default_branch}</p> */}

      <Languages languages={repo.languages} />
      <Contributors contributors={repo.contributors} />
    </div>
  );
}
