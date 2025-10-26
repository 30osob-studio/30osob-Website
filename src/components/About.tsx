import { useAbout } from "../hooks/useAbout";
import { useAllRepos } from "../hooks/useAllRepos";
import GridMotion from "./GridMotion";
import Logo from "./Logo";
import TextType from "./TextType";

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

    <div className="h-150 w-full relative">
      <div className="top-0 bg-black h-full z-0">
        {!isLoading && repoImages.length > 0 ? (
          <GridMotion items={repoImages} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {isLoading ? "Loading..." : "No images"}
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-black/85 z-[10]">
        <div className="flex flex-col md:flex-row items-center justify-center h-full md:gap-12 lg:gap-20 xl:gap-48 px-150 max-w-full">
          <div className="flex flex-col text-white lato-regular justify-center items-center md:items-start text-center md:text-left max-w-full gap-0 md:gap-4 order-2 md:order-1">
            <p className="montserrat-bold text-4xl md:text-3xl lg:text-4xl xl:text-6xl max-w-3/4 min-w-3/4 -mt-4 md:mt-45 break-words">
              <TextType
                text={[
                  "Welcome to 30osob",
                  about.description,
                  "It's about a lot of things",
                  "Check it out",
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="."
              />
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl lato-light md:min-w-200 max-w-full break-words px-4 md:px-0">
              {about.readme}
            </p>
          </div>
          <div className="w-96 h-96 md:w-[20rem] md:h-[20rem] lg:w-[35rem] lg:h-[35rem] xl:w-[45rem] xl:h-[45rem] flex-shrink-0 order-1 md:order-2">
            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
}
