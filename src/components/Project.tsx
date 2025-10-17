import type { RepoItem } from "../types/repos";
import Contributors from "./Contributors";
import Languages from "./Languages";
import { LinkIcon, GitHubIcon } from "../components/icons";
import { formatDistanceToNow } from "date-fns";

interface ProjectProps {
  project: RepoItem;
}

export default function Project({ project }: ProjectProps) {
  const creationDate = new Date(project.created_at).toLocaleDateString("en-US");
  const updatedDate = formatDistanceToNow(new Date(project.pushed_at), {
    addSuffix: true,
  });

  return (
    <div className="m-4 p-4 bg-gray-800 rounded-xl border border-[rgba(255,255,255,0.34)] flex flex-col gap-6 items-center max-w-full sm:max-w-md md:max-w-lg">
      {project.repo_image && (
        <img
          className="rounded w-full max-w-xs h-auto object-cover"
          src={project.repo_image}
          alt={project.name}
        />
      )}

      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <p className="text-xl text-white break-words">{project.name}</p>
          {project.homepage && (
            <a href={project.homepage} target="_blank" rel="noopener noreferrer">
              <LinkIcon size={24} color="white" />
            </a>
          )}
        </div>

        {project.description && (
          <p className="text-gray-400 break-words">{project.description}</p>
        )}

        <p className="text-gray-400 text-sm">Created at: {creationDate}</p>
        <p className="text-gray-400 text-sm">Last change: {updatedDate}</p>

        <Languages languages={project.languages} />

        <div className="flex flex-wrap gap-2">
          {project.topics.map((topic) => (
            <span
              key={topic}
              className="flex items-center justify-center rounded-full bg-[rgba(0,136,255,0.34)] text-[rgba(41,154,253,1)] py-1 px-3 border-2 border-[rgba(41,154,253,1)] text-sm"
            >
              {topic}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <a href={project.html_url} target="_blank" rel="noopener noreferrer">
            <GitHubIcon size={30} color="white" />
          </a>
          <Contributors contributors={project.contributors} />
        </div>
      </div>
    </div>
  );
}