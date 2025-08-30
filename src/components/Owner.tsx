import { useOwner } from "../hooks/useOwner";
import { GitHubIcon, MailIcon } from "../components/icons";

export default function Owner() {
  const { owner, fallbackText } = useOwner();

  if (!owner) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <div className="bg-black text-white flex flex-col md:flex-row justify-center p-4 md:p-10 w-full gap-6 break-words items-center">
      <img
        className="rounded-full w-40 h-40"
        src={owner.avatar_url}
        alt={owner.name}
      />

      <div className="flex flex-col gap-4 max-w-full">
        <div className="flex flex-col">
          <p className="text-xl font-semibold">{owner.name}</p>
          <p className="text-gray-400 text-sm">creator of {owner.company}</p>
        </div>

        <p className="text-gray-400 break-words">{owner.bio}</p>
        <p className="text-gray-400">Country: {owner.location}</p>

        <div className="text-gray-400 break-words max-w-200">
          {owner.readme}
        </div>

        <div className="flex gap-2 flex-wrap items-center">
          <div className="flex gap-1 items-center">
            <MailIcon />
            {owner.email}
          </div>
          <p className="text-gray-400">{owner.twitter_username}</p>
          <a
            className="flex flex-row gap-1"
            href={owner.html_url}
            target="_blank"
          >
            <GitHubIcon size={24} color="white" />
            Github
          </a>
        </div>
      </div>
    </div>
  );
}
