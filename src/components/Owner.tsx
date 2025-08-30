import { useOwner } from "../hooks/useOwner";
import { GitHubIcon, MailIcon } from "../components/icons";

export default function Owner() {
  const { owner, fallbackText } = useOwner();

  if (!owner) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <div className="bg-[rgba(0,0,0,1)] text-white flex justify-center p-20 items-center">
      <img
        className="rounded-full w-50 h-50 "
        src={owner.avatar_url}
        alt={owner.name}
      />
      <div className="flex flex-col justify-center p-10 gap-4">
        <div className="flex flex-col">
          <p className="text-xl">{owner.name}</p>
          <p className="text-gray-400">creator of {owner.company}</p>
        </div>

        <p className="text-gray-400">{owner.bio}</p>
        <p className="text-gray-400">Country: {owner.location}</p>
        <p className="text-gray-400">{owner.twitter_username}</p>

        <div className="w-200 text-gray-400">{owner.readme}</div>
        <div className="flex gap-2 items-center">
          <div className="flex flex-row gap-1">
            <MailIcon></MailIcon>
            {owner.email}
          </div>
          <p>{owner.twitter_username}</p>
          <a href={owner.html_url}>
            <GitHubIcon size={24} color="white"></GitHubIcon>
          </a>
        </div>
      </div>
    </div>
  );
}
