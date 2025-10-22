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
    <Card className="flex items-center bg-white overflow-hidden pt-0 h-full gap-3 border-black border-3">
      {project.repo_image && (
        <AspectRatio ratio={1} className="w-full h-full flex-shrink-0">
          <img
            className="object-cover border-b-3 border-black"
            src={project.repo_image}
            alt={project.name}
          />
        </AspectRatio>
      )}

      <div className="w-full flex flex-col h-full">
        <CardHeader className="gap-0 flex">
          <CardTitle className="text-xl font-bold text-black line-clamp-1 mr-2">
            {project.name}
          </CardTitle>
          {project.homepage && (
            <CardAction className="h-full flex items-center justify-center">
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkIcon size={24} color="black" />
              </a>
            </CardAction>
          )}
        </CardHeader>

        <CardContent className="flex flex-col gap-4 flex-1 mb-4">
          {project.description && (
            <CardDescription className="text-black break-words line-clamp-3 lato-regular">
              {project.description}
            </CardDescription>
          )}
          <div className="border-t-2 border-gray-400 border-dotted -mx-12"></div>
          <div className="flex justify-between items-center">
            <span className="text-black">
              <p className="font-bold lato-bold">Created at:</p>
              <p className="text-black text-sm lato-regular">{creationDate}</p>
            </span>
            <span className="text-black">
              <p className="font-bold lato-bold">Last change:</p>
              <p className="text-black text-sm lato-regular">{updatedDate}</p>
            </span>
          </div>
          <div className="border-t-2 border-gray-400 border-dotted -mx-12"></div>
          
          <Languages languages={project.languages} />
          <div className="flex flex-wrap gap-2">
            {project.topics.map((topic) => (
              <span
                key={topic}
                className="flex items-center lato-bold justify-center rounded-full bg-white text-black py-1 px-3 border-2 border-blck text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </CardContent>
        <div className="border-t-2 border-black"></div>
        <CardFooter className="flex justify-between items-center mt-3">
          <a href={project.html_url} target="_blank" rel="noopener noreferrer">
            <GitHubIcon size={37.6} color="black" />
            
          </a>
          <div className="border-2 black rounded-full p-[0.2rem]"><Contributors contributors={project.contributors} /></div>
          
        </CardFooter>
      </div>
      
    </Card>
  );
}
