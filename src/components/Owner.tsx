import { useOwner } from "../hooks/useOwner";

export default function Owner() {
  const { owner, fallbackText } = useOwner();

  if (!owner) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <>
      <p>{owner.avatar_url}</p>
      <p>{owner.html_url}</p>
      <p>{owner.name}</p>
      <p>{owner.company}</p>
      <p>{owner.location}</p>
      <p>{owner.email}</p>
      <p>{owner.bio}</p>
      <p>{owner.twitter_username}</p>
      <p>{owner.public_repos}</p>
      <p>{owner.readme}</p>
    </>
  );
}
