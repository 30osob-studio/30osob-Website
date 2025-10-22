import type { RepoItem } from "../types/repos";
import Contributors from "./Contributors";
import TagList from "./TagList";
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

          {project.homepage && (
            <CardAction className="h-full flex items-center justify-center">
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >          <CardTitle className="text-[clamp(2rem,2vw,2rem)] font-bold text-black break-words w-full">
            {project.name.replace(/-/g, ' ')}
          </CardTitle>
              </a>
            </CardAction>
          )}
        </CardHeader>

        <CardContent className="flex flex-col gap-4 pb-4 flex-1">
          {project.description && (
            <CardDescription className="text-[clamp(1rem,1vw,1rem)] text-black break-words line-clamp-3 lato-regular">
              {project.description}
            </CardDescription>
          )}
          <div className="flex-1"></div>
          <div className="border-t-2 border-gray-400 border-dotted -mx-12"></div>
          <div className="flex justify-between items-center">
            <span className="text-black">
              <p className="font-bold text-[clamp(1rem,1vw,1rem)]">Created at:</p>
              <p className="text-black text-sm lato-regular text-[clamp(0.9rem,0.9vw,0.9rem)]">{creationDate}</p>
            </span>
            <span className="text-black">
              <p className="font-bold text-[clamp(1rem,1vw,1rem)]">Last change:</p>
              <p className="text-black text-sm lato-regular text-[clamp(0.9rem,0.9vw,0.9rem)]">{updatedDate}</p>
            </span>
          </div>
          <div className="border-t-2 border-gray-400 border-dotted -mx-12"></div>   
          <TagList items={project.languages} tagClassName="bg-black text-white text-[clamp(0.9rem,0.9vw,0.9rem)]" />
          <TagList items={project.topics} tagClassName="bg-white text-black text-[clamp(0.9rem,0.9vw,0.9rem)]" />
        </CardContent>
        <div className="border-t-3 border-black"></div>
        <CardFooter className="flex justify-between items-center mt-3">
          <a href={project.html_url} target="_blank" rel="noopener noreferrer">
            <GitHubIcon size={37.6} color="black" />
            
          </a>
          {project.contributors && project.contributors.length > 0 && (
            <div className="border-3 black rounded-full p-[0.15rem]"><Contributors contributors={project.contributors} /></div>
          )}
          
        </CardFooter>
      </div>
      
    </Card>
  );
}
