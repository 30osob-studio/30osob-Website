import About from "./components/About";
import { useAbout } from "./hooks/useAbout";

function App() {
  const { about, fallbackText } = useAbout();

  if (about) {
    return (
      <>
        <About about={about} />
      </>
    );
  }

  return (
    <>
      <div>{fallbackText}</div>
    </>
  );
}

export default App;
