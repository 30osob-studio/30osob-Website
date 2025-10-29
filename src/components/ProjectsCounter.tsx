interface ProjectsCounterProps {
  count?: number;
  fallbackText?: string;
  className?: string;
}

export default function ProjectsCounter({
  count,
  fallbackText,
  className = "w-full bg-black montserrat-bold text-white p-[2vw] text-[5vw] lg:text-[2vw]",
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