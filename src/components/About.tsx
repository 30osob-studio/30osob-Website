import { useAbout } from "../hooks/useAbout";

export default function About() {
  const { about, fallbackText } = useAbout();

  if (!about) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <div className="bg-[rgba(6,18,28,1)] text-white flex justify-center p-20">
      <img
        className="rounded-full w-50 h-50"
        src={about.avatar_url}
        alt={about.name}
      />
      <div className="flex flex-col justify-center p-10">
        <p>{about.description}</p>
        <p>{about.location}</p>
        <p>{about.twitter_username}</p>
        <p>{about.readme}</p>
      </div>
    </div>
  );
}
