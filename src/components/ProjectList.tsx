import type { ReposData } from "../types/repos";
import Project from "./Project";
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
  if (!projects) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <div className="flex justify-center w-full">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full my-4"
      >
        <CarouselContent className="ml-0 pr-4 flex">
          {projects.map((project) => (
            <CarouselItem
              key={project.name}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/3"
            >
              <Project project={project} />
            </CarouselItem>
          ))}
          <div className="p-2"></div>
        </CarouselContent>
        <CarouselPrevious className="-left-0 top-[47%] bg-white border-black border-3" />
        <CarouselNext className="-right-0 top-[47%] bg-white border-black border-3" />

      </Carousel>
    </div>
  );
}
