import type { ReposData } from "../types/repos";
import Project from "./Project";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface ProjectListProps {
  projects: ReposData | null;
  fallbackText: string;
}

export default function ProjectList({ projects }: ProjectListProps) {
  if (!projects) {
    return null;
  }

  const displayProjects =
    projects.length < 6
      ? Array.from({ length: 12 }, (_, i) => projects[i % projects.length])
      : projects;

  return (
    <div className="flex justify-center w-full">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full my-4"
      >
        <CarouselContent className="ml-0 pr-4 flex">
          {displayProjects.map((project, idx) => (
            <CarouselItem
              key={`${project.name}-${idx}`}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/3"
            >
              <Project project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-0 h-full py-100 w-7 rounded-none" />
        <CarouselNext className="-right-0 h-full w-7 rounded-none" />
      </Carousel>
    </div>
  );
}
