import { useAbout } from "../hooks/useAbout";
import { useAllRepos } from "../hooks/useAllRepos";
import CardSwap, { Card } from './CardSwap'

export default function About() {
  const { about, fallbackText } = useAbout();
  const { repos: uniqueRepos } = useAllRepos();

  if (!about) {
    return <>{fallbackText && <div>{fallbackText}</div>}</>;
  }

  return (
    <div className="relative w-full max-h-150 h-screen overflow-hidden bg-[rgba(255, 255, 255, 1)] flex items-center">
    
      <div className="flex flex-col mb-30 ml-20 p-6 md:p-10 w-1/2">
        <img
        className="rounded-full w-100 h-100 flex-shrink-0"
        src={about.avatar_url}
        alt={about.name}
      />  
        <p className="font-bold text-[clamp(2.5rem,2.5vw,2.5rem)]">{about.description}</p>
        <p className="lato-regular text-[clamp(1.5rem,1.5vw,1.5rem)]">{about.readme}</p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <CardSwap
          cardDistance={15}
          verticalDistance={15}
          delay={5000}
          pauseOnHover={false}
          width={300}
          height={300}
        >
          {uniqueRepos.map((repo, idx) => (
            <Card key={idx}>
              <div className="w-full h-full flex flex-col text-white overflow-hidden">
                {repo.repo_image && (
                  <img 
                    src={repo.repo_image} 
                    alt={repo.name}
                    className="w-full h-full object-cover rounded-xl border-3 border-black"
                  />
                )}
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </div>
  );
}
