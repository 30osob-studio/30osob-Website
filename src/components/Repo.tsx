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
    <div className="m-4 p-4 bg-gray-800 rounded-xl border border-[rgba(255,255,255,0.34)] flex flex-col gap-6 items-center max-w-full sm:max-w-md md:max-w-lg">
      {repo.repo_image && (
        <img
          className="rounded w-full max-w-xs h-auto object-cover"
          src={repo.repo_image}
          alt={repo.name}
        />
      )}

      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <p className="text-xl text-white break-words">{repo.name}</p>
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
              <LinkIcon size={24} color="white" />
            </a>
          )}
        </div>

        {repo.description && (
          <p className="text-gray-400 break-words">{repo.description}</p>
        )}

        <p className="text-gray-400 text-sm">Created at: {creationDate}</p>
        <p className="text-gray-400 text-sm">Last change: {updatedDate}</p>

        <Languages languages={repo.languages} />

        <div className="flex flex-wrap gap-2">
          {repo.topics.map((topic) => (
            <span
              key={topic}
              className="flex items-center justify-center rounded-full bg-[rgba(0,136,255,0.34)] text-[rgba(41,154,253,1)] py-1 px-3 border-2 border-[rgba(41,154,253,1)] text-sm"
            >
              {topic}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <GitHubIcon size={30} color="white" />
          </a>
          <Contributors contributors={repo.contributors} />
        </div>
      </div>
    </div>
  );
}
