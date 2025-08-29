import { useAbout } from "../hooks/useAbout";

export default function About() {
  const { about, fallbackText } = useAbout();

  if (!about) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <>
      <p className="text-3xl font-bold underline">{about.name}</p>
      <p>{about.description}</p>
      <p>{about.location}</p>
      <p>{about.email}</p>
      <p>{about.twitter_username}</p>
      <p>{about.public_repos}</p>
      <p>{about.html_url}</p>
      <p>{about.avatar_url}</p>
      <p>{about.readme}</p>
    </>
  );
}
