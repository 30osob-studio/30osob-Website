import type { ReposData } from "../types/repos";
import Project from "./Project";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectListProps {
  projects: ReposData | null;
  fallbackText: string;
}

export default function ProjectList({
  projects,
  fallbackText,
}: ProjectListProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!projects) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  if (!isClient) {
    return (
      <div className="max-w-full px-20 bg-[rgba(6,18,28,1)]">
        <div className="flex gap-4 overflow-x-auto">
          {projects.map((project) => (
            <div key={project.name} className="flex-shrink-0 w-full md:w-1/3">
              <Project project={project} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-500 border border-red-500 flex justify-center w-full px-4">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full my-4 border border-blue-500"
      >
        <CarouselContent>
          {projects.map((project) => (
            <CarouselItem
              key={project.name}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/3"
            >
              <Project project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-3 bg-white border-none" />
        <CarouselNext className="-right-3 bg-white border-none" />
      </Carousel>
    </div>
  );
}
