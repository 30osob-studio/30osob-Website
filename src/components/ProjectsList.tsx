import type { RepoItem } from "../types/repos";
import Project from "./Project";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectsListProps {
  repos: RepoItem[] | null;
  fallbackText?: string;
}

export default function ProjectsList({
  repos,
  fallbackText,
}: ProjectsListProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!repos) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  if (!isClient) {
    return (
      <div className="max-w-full px-12 bg-[rgba(6,18,28,1)] py-12">
        <div className="flex gap-4 overflow-x-auto">
          {repos.map((repo) => (
            <div
              key={repo.name}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              <Project repo={repo} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[rgba(6,18,28,1)] relative py-12">
      <div className="w-full relative px-12">
        <Carousel opts={{ align: "center" }} className="w-full">
          <CarouselContent className="gap-6 px-0">
            {repos.map((repo, index) => (
              <CarouselItem
                key={repo.name}
                className={`basis-auto shrink-0 ${
                  index === 0 ? "ml-6 sm:ml-12" : ""
                } ${index === repos.length - 1 ? "mr-6 sm:mr-12" : ""}`}
              >
                <Project repo={repo} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 top-1/2 -translate-y-1/2 z-20 size-12 bg-transparent text-white border-none hover:bg-transparent" />
          <CarouselNext className="right-0 top-1/2 -translate-y-1/2 z-20 size-12 bg-transparent text-white border-none hover:bg-transparent" />

          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[rgba(6,18,28,1)] to-transparent pointer-events-none z-10" />

          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[rgba(6,18,28,1)] to-transparent pointer-events-none z-10" />
        </Carousel>
      </div>
    </div>
  );
}
