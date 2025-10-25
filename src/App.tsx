import About from "./components/About";
import ProjectList from "./components/ProjectList";
import Owner from "./components/Owner";
import Header from "./components/Header";
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
    <div className="montserrat-regular">
      {/* <Header /> */}
      <About />
      <ProjectsCounter
        count={about?.public_repos}
        fallbackText={aboutFallbackText}
        className="bg-black text-white p-8"
      />
      <ProjectList projects={repos} fallbackText={reposFallbackText} />
      <Owner />
      <ProjectsCounter
        count={owner?.public_repos}
        fallbackText={ownerFallbackText}
        className="bg-black text-white p-8 border-t border-gray-400"
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
