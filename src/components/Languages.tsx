import type { RepoLanguages } from "../types/repos";

interface LanguagesProps {
  languages: RepoLanguages;
}

export default function Languages({ languages }: LanguagesProps) {
  if (!languages || Object.keys(languages).length === 0) {
    return null;
  }

  return (
    <ul>
      {Object.entries(languages).map(([name, bytes]) => (
        <ul>
          {name}: {bytes}
        </ul>
      ))}
    </ul>
  );
}
