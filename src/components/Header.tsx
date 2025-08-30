import { useAbout } from "../hooks/useAbout";

export default function About() {
  const { about, fallbackText } = useAbout();

  if (!about) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <div className="bg-[rgba(0,0,0,1)] text-white">
      <img
        className="rounded-full w-15 h-15"
        src={about.avatar_url}
        alt={about.name}
      />
    </div>
  );
}
