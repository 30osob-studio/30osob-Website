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
    <div className="border border-red-500 flex justify-center">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-[calc(100%-128px)] mx-16 my-4 border border-blue-500"
      >
        <CarouselContent className="">
          {projects.map((project) => (
            <CarouselItem
              key={project.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Project project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
