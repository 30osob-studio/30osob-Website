import { useAbout } from "../hooks/useAbout";
import { GitHubIcon, MailIcon } from "../components/icons";

export default function About() {
  const { about, fallbackText } = useAbout();

  if (!about) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <footer className="w-full bg-[rgba(0,0,0,1)] items-center text-white flex flex-row justify-between p-[1.2vw]">
      <div className="flex flex-row gap-[1vw] items-center">
                    <MailIcon 
              color="white"
              responsiveSize={{
                mobile: "6.5vw",
                tablet: "4.5vw",
                desktop: "2.5vw"
              }}
            />
        <p className="text-[5vw] sm:text-[3.5vw] md:text-[2vw] lg:text-[1.2vw] lato-bold">{about.email}</p>
        
      </div>
      <a href={about.html_url} className="items-center justify-center">
                    <GitHubIcon 
              color="white"
              responsiveSize={{
                mobile: "6.5vw",
                tablet: "4.5vw",
                desktop: "2.5vw"
              }}
            />
      </a>
    </footer>
  );
}
