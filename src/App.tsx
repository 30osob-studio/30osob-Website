import { useEffect, useState } from "react";
import About from "./components/About";
import ProjectList from "./components/ProjectList";
import Owner from "./components/Owner";
import ProjectsCounter from "./components/ProjectsCounter";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import { useRepos } from "./hooks/useRepos";
import { useOwnerRepos } from "./hooks/useOwnerRepos";
import { useAbout } from "./hooks/useAbout";
import { useOwner } from "./hooks/useOwner";
import { ApiHealthProvider } from "./context/ApiHealthContext";

function AppContent() {
  const {
    repos,
    fallbackText: reposFallbackText,
    isLoading: reposLoading,
  } = useRepos();
  const {
    repos: ownerRepos,
    fallbackText: ownerReposFallbackText,
    isLoading: ownerReposLoading,
  } = useOwnerRepos();
  const {
    about,
    fallbackText: aboutFallbackText,
    isLoading: aboutLoading,
  } = useAbout();
  const {
    owner,
    fallbackText: ownerFallbackText,
    isLoading: ownerLoading,
  } = useOwner();

  const [forceShowContent, setForceShowContent] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setForceShowContent(true);
    }, 30000);

    return () => clearTimeout(timeoutId);
  }, []);

  const isLoading =
    (reposLoading || ownerReposLoading || aboutLoading || ownerLoading) &&
    !forceShowContent;

  return (
    <div className="w-full text-[1vw]">
      <LoadingScreen isVisible={isLoading} />
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

function App() {
  return (
    <ApiHealthProvider>
      <AppContent />
    </ApiHealthProvider>
  );
}

export default App;
