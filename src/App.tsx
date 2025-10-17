import About from "./components/About";
import ProjectList from "./components/ProjectList";
import Owner from "./components/Owner";
import Header from "./components/Header";
import ProjectsBar from "./components/ProjectsBar";
import Footer from "./components/Footer";
import OwnerProjectsBar from "./components/OwnerProjectsBar";
import { useRepos } from "./hooks/useRepos";
import { useOwnerRepos } from "./hooks/useOwnerRepos";

function App() {
  const { repos, fallbackText: reposFallbackText } = useRepos();
  const { repos: ownerRepos, fallbackText: ownerReposFallbackText } = useOwnerRepos();

  return (
    <>
      <Header />
      <About />
      <ProjectsBar></ProjectsBar>
      <ProjectList projects={repos} fallbackText={reposFallbackText} />
      <Owner />
      <OwnerProjectsBar></OwnerProjectsBar>
      <ProjectList projects={ownerRepos} fallbackText={ownerReposFallbackText} />
      <Footer></Footer>
    </>
  );
}

export default App;
