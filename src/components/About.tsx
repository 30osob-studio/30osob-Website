import { useAbout } from "../hooks/useAbout";
import { useAllRepos } from "../hooks/useAllRepos";
import GridMotion from "./GridMotion";
import Logo from "./Logo";
import TextType from "./TextType";

export default function About() {
  const { about, fallbackText } = useAbout();
  const { repoImages } = useAllRepos();

  if (!about) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }
  return (
    <div className="h-full w-full relative z-50">
      <div className="top-0 bg-black h-full z-0">
        <GridMotion items={repoImages} />
      </div>
      <div className="absolute inset-0 bg-black/85 z-[10] h-full">
        <div className="border-red-500 border-5 flex flex-col-reverse lg:flex-row items-center h-full">
          <div className="lg:h-full text-[50vw] px-[4%] lg:pl-[5%] flex flex-col text-white lato-regular text-center lg:text-left w-full">
            <div className="montserrat-bold lg:h-1/2 flex-shrink-0 flex items-end">
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
                className="text-center text-[13.5%] sm:text-[11.5%] md:text-[8.5%] lg:text-[5.5%] lg:text-left"
              />
            </div>
            <div className="lg:h-1/2 text-[11.5%] sm:text-[7.5%] md:text-[5.5%] lg:text-[3.5%] lato-light">
              {about.readme}
            </div>
          </div>
          <div className=" lg:pr-[5%] px-[4%] relative w-[60%] h-[60%] lg:w-[60%] lg:h-full flex-shrink-0">
            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
}
