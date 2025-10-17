import type { RepoItem } from "../types/repos";
import Contributors from "./Contributors";
import Languages from "./Languages";
import { LinkIcon, GitHubIcon } from "../components/icons";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProjectProps {
  repo: RepoItem;
}

export default function Project({ repo }: ProjectProps) {
  const creationDate = new Date(repo.created_at).toLocaleDateString("en-US");
  const updatedDate = formatDistanceToNow(new Date(repo.pushed_at), {
    addSuffix: true,
  });

  return (
    <Card className="bg-gray-800 border-[rgba(255,255,255,0.34)] w-80 flex flex-col gap-0">
      <CardContent className="p-0">
        {repo.repo_image && (
          <img
            className="rounded-t w-full h-auto object-cover"
            src={repo.repo_image}
            alt={repo.name}
          />
        )}
      </CardContent>

      <CardHeader className="px-6 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <CardTitle className="text-white break-words">{repo.name}</CardTitle>
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
              <LinkIcon size={24} color="white" />
            </a>
          )}
        </div>

        {repo.description && (
          <CardDescription className="text-gray-400 break-words">
            {repo.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-4 px-6 py-0">
        <div className="flex flex-col gap-2">
          <p className="text-gray-400 text-sm">Created at: {creationDate}</p>
          <p className="text-gray-400 text-sm">Last change: {updatedDate}</p>
        </div>

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
      </CardContent>

      <CardFooter className="flex justify-between items-center px-6 py-4">
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          <GitHubIcon size={30} color="white" />
        </a>
        <Contributors contributors={repo.contributors} />
      </CardFooter>
    </Card>
  );
}
