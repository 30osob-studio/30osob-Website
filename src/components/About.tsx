import { useAbout } from "../hooks/useAbout";
import { GitHubIcon, MailIcon } from "../components/icons";

export default function About() {
  const { about, fallbackText } = useAbout();

  if (!about) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <div className="">
      <img
        className="rounded-full w-50 h-50"
        src={about.avatar_url}
        alt={about.name}
      />
      <p>{about.description}</p>
      <p>{about.location}</p>

      <div className="flex flex-row gap-1">
        <MailIcon></MailIcon>
        {about.email}
      </div>
      <p>{about.twitter_username}</p>
      <a href={about.html_url}>
        <GitHubIcon size={24} color="white"></GitHubIcon>
      </a>

      <p>{about.readme}</p>
      <div className="bg-black text-white p-8">
        Projects: {about.public_repos}
      </div>
    </div>
  );
}
