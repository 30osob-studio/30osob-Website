import type { JSX } from "react";
import { useOwnerRepos } from "../hooks/useOwnerRepos";
import Repo from "./Repo";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function OwnerRepos(): JSX.Element {
  const { repos, fallbackText } = useOwnerRepos();

  if (!repos) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <div className="max-w-full px-20 bg-[rgba(6,18,28,1)]">
      <Carousel>
        <CarouselContent>
          {repos.map((repo) => (
            <CarouselItem className="basis-full md:basis-1/3">
              <Repo key={repo.name} repo={repo} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-black text-white" />
        <CarouselNext className="bg-black text-white" />
      </Carousel>
    </div>
  );
}
