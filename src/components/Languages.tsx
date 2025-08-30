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
          className="flex items-center justify-center rounded-full bg-[rgba(255,140,0,0.34)] text-[rgba(255,140,0,1)] py-0.5 px-3 border-2 border-[rgba(255,140,0,1)] pb-1 text-sm"
        >
          {name}
        </div>
      ))}
    </div>
  );
}
