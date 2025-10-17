import About from "./components/About";
import ProjectsList from "./components/ProjectsList";
import Owner from "./components/Owner";
import Header from "./components/Header";
import ProjectsBar from "./components/ProjectsBar";
import Footer from "./components/Footer";
import OwnerProjectsBar from "./components/OwnerProjectsBar";
import { useRepos } from "./hooks/useRepos";
import { useOwnerRepos } from "./hooks/useOwnerRepos";

function ProjectsListWrapper() {
  const { repos, fallbackText } = useRepos();
  return <ProjectsList repos={repos} fallbackText={fallbackText} />;
}

function OwnerProjectsListWrapper() {
  const { repos, fallbackText } = useOwnerRepos();
  return <ProjectsList repos={repos} fallbackText={fallbackText} />;
}

function App() {
  return (
    <>
      <Header />
      <About />
      <ProjectsBar></ProjectsBar>
      <ProjectsListWrapper />
      <Owner />
      <OwnerProjectsBar></OwnerProjectsBar>
      <OwnerProjectsListWrapper />
      <Footer></Footer>
    </>
  );
}

export default App;
