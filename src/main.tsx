import { createRoot } from "react-dom/client";
import Home from "./Home.tsx";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/old" element={<App />} />
    </Routes>
  </BrowserRouter>
);
