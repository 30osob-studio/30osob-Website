import About from "./components/About";
import Repos from "./components/Repos";
import Owner from "./components/Owner";
import OwnerRepos from "./components/OwnerRepos";
import Header from "./components/Header";
import ProjectsBar from "./components/ProjectsBar";

function App() {
  return (
    <>
      <Header />
      <About />
      <ProjectsBar></ProjectsBar>
      <Repos />
      <Owner />
      <OwnerRepos />
    </>
  );
}

export default App;
