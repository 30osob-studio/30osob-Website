import type { RepoLanguages } from "../types/repos";

interface LanguagesProps {
  languages: RepoLanguages;
}

export default function Languages({ languages }: LanguagesProps) {
  if (!languages || Object.keys(languages).length === 0) {
    return null;
  }

  return (
    <ul className="border-2 m-4 p-4 break-words">
      {Object.entries(languages).map(([name, bytes]) => (
        <li key={name}>
          {name}: {bytes}
        </li>
      ))}
    </ul>
  );
}
