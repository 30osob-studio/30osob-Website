import { Header } from "./new_components/Header";
import { Footer } from "./new_components/Footer";

function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="flex-1">
        <div className="h-200 bg-red-500">sdfsdfsdfsdf</div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
