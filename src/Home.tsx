import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectList from "./components/ProjectList";

function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="flex-1">
        <ProjectList />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
