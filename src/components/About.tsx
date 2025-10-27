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
        <div className="flex flex-col md:flex-row items-center h-full w-full overflow-hidden">
          <div className="px-20 flex flex-col text-white lato-regular justify-center items-start text-left w-full md:w-auto max-w-full order-2 md:order-1 overflow-hidden">
            <div className="montserrat-bold max-w-full h-[30%] flex-shrink-0 flex items-start justify-start">
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
                className="text-left text-[clamp(1.75rem,5vw,3.5rem)] w-full block"
              />
            </div>
            <div className="h-[30%] text-[clamp(0.75rem,2.5vw,1.5rem)] max-w-full lato-light break-words flex-shrink-0">
              {about.readme}
            </div>
          </div>
          <div className="px-10 w-[60%] h-[100%] flex-shrink-0 order-1 md:order-2 max-w-[90vw] max-h-full mx-auto md:mx-0">
            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
}
