import About from "./components/About";
import ProjectList from "./components/ProjectList";
import Owner from "./components/Owner";
import ProjectsCounter from "./components/ProjectsCounter";
import Footer from "./components/Footer";
import { useRepos } from "./hooks/useRepos";
import { useOwnerRepos } from "./hooks/useOwnerRepos";
import { useAbout } from "./hooks/useAbout";
import { useOwner } from "./hooks/useOwner";

function App() {
  const { repos, fallbackText: reposFallbackText } = useRepos();
  const { repos: ownerRepos, fallbackText: ownerReposFallbackText } =
    useOwnerRepos();
  const { about, fallbackText: aboutFallbackText } = useAbout();
  const { owner, fallbackText: ownerFallbackText } = useOwner();

  return (
    <div className="w-full text-[1vw]">
      <About />
      <ProjectsCounter
        count={about?.public_repos}
        fallbackText={aboutFallbackText}
      />
      <ProjectList projects={repos} fallbackText={reposFallbackText} />
      <Owner />
      <ProjectsCounter
        count={owner?.public_repos}
        fallbackText={ownerFallbackText}
      />
      <ProjectList
        projects={ownerRepos}
        fallbackText={ownerReposFallbackText}
      />
      <Footer></Footer>
    </div>
  );
}

export default App;
