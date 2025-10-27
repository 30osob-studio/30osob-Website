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
    <div className="h-150 w-full relative z-50">
      <div className="top-0 bg-black h-full z-0">
        {!isLoading && repoImages.length > 0 ? (
          <GridMotion items={repoImages} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {isLoading ? "Loading..." : "No images"}
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-black/85 z-[10] overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch h-full w-full md:gap-12 lg:gap-20 xl:gap-48 overflow-hidden">
          <div className="flex flex-col text-white lato-regular justify-center items-center md:items-start text-center md:text-left w-full md:w-auto max-w-full order-2 md:order-1 min-h-0 overflow-hidden">
            <p className="montserrat-bold text-[clamp(1.5rem,5vw,3.5rem)] max-w-[clamp(14rem,90vw,48rem)] m-0 p-0 break-words flex-shrink-0">
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
            <p className="text-[clamp(0.75rem,3.5vw,1.5rem)] max-w-[clamp(14rem,90vw,48rem)] m-0 p-0 mt-2 md:mt-4 lato-light break-words flex-1 overflow-y-auto">
              {about.readme}
            </p>
          </div>
          <div className="w-[clamp(18rem,60vw,45rem)] h-[clamp(18rem,60vw,45rem)] flex-shrink-0 order-1 md:order-2 max-w-[90vw] max-h-[85vh]">
            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
}
