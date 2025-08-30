import type { RepoItem } from "../types/repos";
import type { RepoContributor } from "../types/repos";
import Contributors from "./Contributors";
import Languages from "./Languages";
import { LinkIcon, GitHubIcon } from "../components/icons";

interface RepoProps {
  repo: RepoItem;
}

export default function Repo({ repo }: RepoProps) {
  return (
    <div className="m-4 p-4 bg-green-500 break-words w-80 h-100 rounded-xl flex flex-col">
      <p className="bg-yellow-500">{repo.readme}</p>
      <div className="flex justify-between w-full items-center">
        <p className="bg-blue-300">{repo.name}</p>
        <a href={repo.homepage ?? undefined} target="_blank">
          <LinkIcon size={24} color="white"></LinkIcon>
        </a>
      </div>

      <a
        className="bg-pink-500"
        href={repo.html_url ?? undefined}
        target="_blank"
      ></a>
      <p>{repo.description}</p>
      <p>{repo.created_at}</p>
      <p>{repo.updated_at}</p>
      <p>{repo.pushed_at}</p>
      <div className="border">
        <Languages languages={repo.languages} />
        <div className="bg-blue-500 flex flex-row gap-4 mt-2">
          {repo.topics.map((topic) => (
            <div
              key={topic}
              className="flex items-center justify-center rounded-full bg-blue-500 text-white py-0.5 px-3 border-2 border-white pb-1 text-sm"
            >
              {topic}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between w-full items-center mt-auto">
        <GitHubIcon size={30} color="white"></GitHubIcon>
        <Contributors contributors={repo.contributors} />
      </div>
      {/* <p>{repo.open_issues_count}</p> */}
      {/* <p>{repo.default_branch}</p> */}
    </div>
  );
}
