import type { RepoItem } from "../types/repos";
import Contributors from "./Contributors";
import Languages from "./Languages";
import { LinkIcon, GitHubIcon } from "../components/icons";
import { formatDistanceToNow, format } from "date-fns";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProjectProps {
  project: RepoItem;
}

export default function Project({ project }: ProjectProps) {
  const creationDate = format(new Date(project.created_at), "MM.dd.yyyy");
  const updatedDate = formatDistanceToNow(new Date(project.pushed_at), {
    addSuffix: true,
  });

  return (
    <Card className="flex items-center bg-gray-800 border-[rgba(255,255,255,0.34)] overflow-hidden pt-0 h-full gap-3">
      {project.repo_image && (
        <AspectRatio ratio={1} className="w-full h-full flex-shrink-0">
          <img
            className="object-cover"
            src={project.repo_image}
            alt={project.name}
          />
        </AspectRatio>
      )}

      <div className="w-full flex flex-col h-full">
        <CardHeader className="gap-0 flex">
          <CardTitle className="text-xl text-white truncate mr-2">
            {project.name}
          </CardTitle>
          {project.homepage && (
            <CardAction className="h-full flex items-center justify-center">
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkIcon size={24} color="white" />
              </a>
            </CardAction>
          )}
        </CardHeader>

        <CardContent className="flex flex-col gap-4 flex-1 mb-4">
          {project.description && (
            <CardDescription className="text-gray-400 break-words line-clamp-2">
              {project.description}
            </CardDescription>
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
        </CardContent>

        <CardFooter className="flex justify-between items-center mt-auto">
          <a href={project.html_url} target="_blank" rel="noopener noreferrer">
            <GitHubIcon size={30} color="white" />
          </a>
          <Contributors contributors={project.contributors} />
        </CardFooter>
      </div>
    </Card>
  );
}
