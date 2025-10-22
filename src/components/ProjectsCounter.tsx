interface ProjectsCounterProps {
  count?: number;
  fallbackText?: string;
  className?: string;
}

export default function ProjectsCounter({
  count,
  fallbackText,
  className = "bg-black text-white p-8",
}: ProjectsCounterProps) {
  if (count === undefined && !fallbackText) {
    return null;
  }

  return (
    <div className={className}>
      {count !== undefined ? `Projects: ${count}` : fallbackText}
    </div>
  );
}