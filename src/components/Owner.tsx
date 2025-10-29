import { useOwner } from "../hooks/useOwner";
import { GitHubIcon, MailIcon } from "../components/icons";

export default function Owner() {
  const { owner, fallbackText } = useOwner();

  if (!owner) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <div className="lato-regular w-full border-b border-gray-400 bg-black text-white flex flex-col md:flex-row justify-center py-[6vw] lg:py-[3vw] gap-6 break-words items-center">
      <img
        className="rounded-full w-[30vw] h-[30vw] lg:w-[15vw] lg:h-[15vw]"
        src={owner.avatar_url}
        alt={owner.name}
      />

      <div className="flex flex-col gap-[1vw] max-w-full">
        <div className="flex flex-col">
          <p className="montserrat-bold text-[7vw] sm:text-[4.5vw] md:text-[3vw] lg:text-[2.2vw]">{owner.name}</p>
          <p className="text-gray-400 text-[5vw] sm:text-[3.5vw] md:text-[2vw] lg:text-[1.2vw] -mt-[5%]">creator of {owner.company}</p>
        </div>

        <p className="text-gray-400 break-words text-[5vw] sm:text-[3.5vw] md:text-[2vw] lg:text-[1.2vw]">{owner.bio}</p>
        <p className="text-gray-400 text-[5vw] sm:text-[3.5vw] md:text-[2vw] lg:text-[1.2vw]">Country: {owner.location}</p>

        {/* <div className="text-gray-400 break-words max-w-200 text-sm">
          {owner.readme}
        </div> */}

        <div className="lato-bold flex flex-col items-start text-[5vw] sm:text-[3.5vw] md:text-[2vw] lg:text-[1.2vw]">
          <div className="flex gap-[4%] items-center">
            <MailIcon 
              color="white"
              responsiveSize={{
                mobile: "6.5vw",
                tablet: "4.5vw",
                desktop: "2vw"
              }}
            />
            {owner.email}
          </div>
          {/* <p className="text-gray-400">{owner.twitter_username}</p> */}
          <a
            className="lato-bold flex items-center flex-row gap-[10%] text-[5vw] sm:text-[3.5vw] md:text-[2vw] lg:text-[1.2vw]"
            href={owner.html_url}
            target="_blank"
          >
            <GitHubIcon 
              color="white"
              responsiveSize={{
                mobile: "6.5vw",
                tablet: "4.5vw",
                desktop: "2vw"
              }}
            />
            Github
          </a>
        </div>
      </div>
    </div>
  );
}
