import { useRepos } from "../hooks/useRepos";
import Repo from "./Repo";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Repos() {
  const { repos, fallbackText } = useRepos();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!repos) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  if (!isClient) {
    return (
      <div className="max-w-full px-20 bg-[rgba(6,18,28,1)]">
        <div className="flex gap-4 overflow-x-auto">
          {repos.map((repo) => (
            <div key={repo.name} className="flex-shrink-0 w-full md:w-1/3">
              <Repo repo={repo} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full px-20 bg-[rgba(6,18,28,1)] relative">
      <Carousel>
        <CarouselContent>
          {repos.map((repo) => (
            <CarouselItem key={repo.name} className="basis-full md:basis-1/3">
              <Repo repo={repo} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-black text-white" />
        <CarouselNext className="bg-black text-white" />
      </Carousel>
    </div>
  );
}
