import type { AboutData } from "../types/about";

interface AboutProps {
  about: AboutData;
}

export default function About({ about }: AboutProps) {
  return (
    <>
      <p>{about.name}</p>
      <p>{about.description}</p>
      <p>{about.location}</p>
      <p>{about.email}</p>
      <p>{about.twitter_username}</p>
      <p>{about.public_repos}</p>
      <p>{about.html_url}</p>
      <p>{about.avatar_url}</p>
      <p>{about.readme}</p>
    </>
  );
}


