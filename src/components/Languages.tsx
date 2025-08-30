import type { RepoLanguages } from "../types/repos";

interface LanguagesProps {
  languages: RepoLanguages;
}

export default function Languages({ languages }: LanguagesProps) {
  if (!languages || Object.keys(languages).length === 0) {
    return null;
  }

  return (
    <div className="bg-orange-400 flex flex-row gap-4 flex-wrap">
      {Object.entries(languages).map(([name]) => (
        <div
          key={name}
          className="flex items-center justify-center rounded-full bg-orange-400 text-white py-0.5 px-3 border-2 border-white pb-1 text-sm"
        >
          {name}
        </div>
      ))}
    </div>
  );
}
