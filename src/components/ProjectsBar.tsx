import { useAbout } from "../hooks/useAbout";

export default function About() {
  const { about, fallbackText } = useAbout();

  if (!about) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <div className="bg-black text-white p-8">
      Projects: {about.public_repos}
    </div>
  );
}
