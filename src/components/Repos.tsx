import { useRepos } from "../hooks/useRepos";
import Repo from "./Repo";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Repos() {
  const { repos, fallbackText } = useRepos();

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
