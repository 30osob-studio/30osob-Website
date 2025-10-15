import type { RepoContributor } from "../types/repos";

interface ContributorsProps {
  contributors: RepoContributor[];
}

export default function Contributors({ contributors }: ContributorsProps) {
  if (!Array.isArray(contributors) || contributors.length === 0) {
    return null;
  }

  return (
    <div className="w-7 h-7">
      {contributors.map((c) => (
        <div key={c.login}>
          <a href={c.html_url}>
            <img className="rounded-full" src={c.avatar_url} alt={c.login} />
          </a>
        </div>
      ))}
    </div>
  );
}
