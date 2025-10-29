import { useAbout } from "../hooks/useAbout";
import { useAllRepos } from "../hooks/useAllRepos";
import GridMotion from "./GridMotion";
import FullLogo from "./Logo";
import { LogoIcon } from "./icons/LogoIcon";
import TextType from "./TextType";

export default function About() {
  const { about, fallbackText } = useAbout();
  const { repoImages } = useAllRepos();

  if (!about) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }
  return (
    <div className="h-[180vw] sm:h-[100vw] lg:h-[40vw] w-full relative z-50 bg-black">
      <div className="bg-black h-full w-full z-0 opacity-25">
<GridMotion 
  items={repoImages}
  responsiveSpeed={{
    mobile: 0.1,
    tablet: 0.1,
    desktop: 0.1
  }}
  responsiveWidth={{
    mobile: "55vw",
    tablet: "45vw",
    desktop: "25vw"
  }}
  responsiveHeight={{
    mobile: "55vw",
    tablet: "45vw",
    desktop: "25vw"
  }}
/>

      </div>
      <div className="absolute inset-0 z-[10]">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-start h-full max-h-full gap-[15vw] lg:gap-[1vw]">
          <div className="justify-center lg:h-full flex flex-col text-white lato-regular lg:w-1/2 px-[5vw]">
            <div className="justify-center text-center lg:text-left lg:justify-start flex montserrat-bold text-[10vw] sm:text-[8vw] sm:h-[20vw] md:text-[6vw] md:h-[15vw] h-[25vw] lg:h-[15vw] items-end lg:text-[4vw]">
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
            </div>
            <p className="text-center lg:text-left text-[6vw] lg:text-[2vw] sm:text-[4vw] md:text-[3vw]">
              {about.readme}
            </p>
          </div>
          <div className="flex lg:h-full flex w-1/2 lg:pr-[5vw]">
            <div className="flex lg:hidden w-full h-full">
              <LogoIcon color="white" className="w-full h-full"/>
            </div> 
            <div className="hidden lg:flex w-full h-full">
              <FullLogo /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
