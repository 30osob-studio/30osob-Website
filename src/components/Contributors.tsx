import type { RepoContributor } from "../types/repos";

interface ContributorsProps {
  contributors: RepoContributor[];
}

export default function Contributors({ contributors }: ContributorsProps) {
  if (!Array.isArray(contributors) || contributors.length === 0) {
    return null;
  }

  return (
    <ul className="border-2 m-4 p-4">
      {contributors.map((c) => (
        <li key={c.login}>
          <p>{c.login}</p>
          <p>{c.avatar_url}</p>
          <p>{c.html_url}</p>
        </li>
      ))}
    </ul>
  );
}
