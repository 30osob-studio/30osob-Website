import { useAbout } from "../hooks/useAbout";
import { GitHubIcon, MailIcon } from "../components/icons";

export default function About() {
  const { about, fallbackText } = useAbout();

  if (!about) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <footer className="bg-[rgba(0,0,0,1)] text-white p-5 flex flex-row gap-4">
      <div className="flex flex-row gap-1">
        <MailIcon></MailIcon>
        {about.email}
      </div>
      <p>{about.twitter_username}</p>
      <a href={about.html_url}>
        <GitHubIcon size={24} color="white"></GitHubIcon>
      </a>
    </footer>
  );
}
