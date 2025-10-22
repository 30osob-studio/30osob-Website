import type { RepoLanguages } from "../types/repos";

interface LanguagesProps {
  languages: RepoLanguages;
}

export default function Languages({ languages }: LanguagesProps) {
  if (!languages || Object.keys(languages).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-row gap-2.5 flex-wrap">
      {Object.entries(languages).map(([name]) => (
        <div
          key={name}
          className="flex items-center lato-bold justify-center rounded-full bg-black text-white py-1 px-3 border-2 border-blck text-sm"
        >
          {name}
        </div>
      ))}
    </div>
  );
}
