import type { RepoItem } from "../types/repos";
import Contributors from "./Contributors";
import Languages from "./Languages";
import { LinkIcon, GitHubIcon } from "../components/icons";
import { formatDistanceToNow } from "date-fns";

interface RepoProps {
  repo: RepoItem;
}

export default function Repo({ repo }: RepoProps) {
  const creationDate = new Date(repo.created_at).toLocaleDateString("en-US");

  const updatedDate = formatDistanceToNow(new Date(repo.pushed_at), {
    addSuffix: true,
  });

  return (
    <div className="m-4 p-4 bg-gray-800 break-words w-80 h-100 rounded-xl flex flex-col border border-[rgba(255,255,255,0.34)]">
      <p className="bg-yellow-500">{repo.readme}</p>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between w-full items-center">
          <p className="text-xl text-white">{repo.name}</p>
          <a href={repo.homepage ?? undefined} target="_blank">
            <LinkIcon size={24} color="white"></LinkIcon>
          </a>
        </div>

        <p className="text-gray-400 truncate ... ">{repo.description}</p>

        <p className="text-gray-400">Created at: {creationDate}</p>

        <p className="text-gray-400">Last change: {updatedDate}</p>

        <Languages languages={repo.languages} />
        <div className="flex flex-row gap-2.5">
          {repo.topics.map((topic) => (
            <div
              key={topic}
              className="flex items-center justify-center rounded-full bg-[rgba(0,136,255,0.34)] text-[rgba(41,154,253,1)] py-0.5 px-3 border-2 border-[rgba(41, 154, 253, 1)] pb-1 text-sm"
            >
              {topic}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between w-full items-center mt-auto">
        <a href={repo.html_url ?? undefined} target="_blank">
          <GitHubIcon size={30} color="white"></GitHubIcon>
        </a>
        <Contributors contributors={repo.contributors} />
      </div>
      {/* <p>{repo.open_issues_count}</p> */}
      {/* <p>{repo.default_branch}</p> */}
      {/* <p>{repo.pushed_at}</p> */}
    </div>
  );
}
