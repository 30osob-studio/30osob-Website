import type { RepoLanguages } from "../types/repos";

interface TagListProps {
  items: string[] | RepoLanguages | null | undefined;
  tagClassName?: string;
}

export default function TagList({ items, tagClassName = "bg-white text-black" }: TagListProps) {
  if (!items) {
    return null;
  }
  
  let tagArray: string[] = [];
  
  if (Array.isArray(items)) {
    tagArray = items.filter((tag) => typeof tag === "string" && tag.length > 0);
  } else if (typeof items === "object") {
    tagArray = Object.keys(items).filter((tag) => tag && tag.length > 0);
  }

  if (tagArray.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-row gap-2.5 flex-wrap">
      {tagArray.map((tag) => (
        <div key={tag} className={`flex items-center lato-bold justify-center rounded-full ${tagClassName} py-1 px-3 border-3 text-sm`}>
          {tag}
        </div>
      ))}
    </div>
  );
}
