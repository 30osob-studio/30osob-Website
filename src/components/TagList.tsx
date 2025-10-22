import type { RepoLanguages } from "../types/repos";

interface TagListProps {
  items: string[] | RepoLanguages;
  tagClassName?: string;
}

export default function TagList({ items, tagClassName = "bg-white text-black" }: TagListProps) {
  // Handle RepoLanguages (object) - extract keys
  const tagArray = Array.isArray(items) ? items : Object.keys(items);

  if (!tagArray || tagArray.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-row gap-2.5 flex-wrap">
      {tagArray.map((tag) => (
        <div
          key={tag}
          className={`flex items-center lato-bold justify-center rounded-full ${tagClassName} py-1 px-3 border-2 border-blck text-sm`}
        >
          {tag}
        </div>
      ))}
    </div>
  );
}