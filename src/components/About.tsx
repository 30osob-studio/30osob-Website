import { useAbout } from "../hooks/useAbout";
import { useAllRepos } from "../hooks/useAllRepos";
import GridMotion from "./GridMotion";

export default function About() {
  const { about, fallbackText } = useAbout();
  const { repoImages, isLoading } = useAllRepos();

  if (!about) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }
  return (
    // <div className="bg-[rgba(6,18,28,1)] text-white flex flex-col md:flex-row justify-center items-center md:items-start gap-6 p-6 md:p-20">
    //   <img
    //     className="rounded-full w-50 h-50 flex-shrink-0"
    //     src={about.avatar_url}
    //     alt={about.name}
    //   />
    //   <div className="flex flex-col justify-center p-6 md:p-10">
    //     <p>{about.description}</p>
    //     <p>{about.twitter_username}</p>
    //     <p>{about.readme}</p>
    //   </div>
    // </div>

    // note: you'll need to make sure the parent container of this component is sized properly
    <div className="h-150 w-full relative">
      <div className="border-10 top-0 bg-white h-full">
        {!isLoading && repoImages.length > 0 ? (
          <GridMotion items={repoImages} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {isLoading ? "Loading..." : "No images"}
          </div>
        )}
      </div>
    </div>
  );
}
