import { useState, useEffect } from "react";

export interface AboutData {
  avatar_url: string;
  description: string;
  name: string;
  location: string;
  email: string;
  twitter_username: string | null;
  public_repos: number;
  html_url: string;
  readme: string;
}

function App() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [fallbackText, setFallbackText] = useState<string>("");

  useEffect(() => {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const apiUrl = isLocalhost ? "/api/about" : "/api/proxy";

    fetch(apiUrl)
      .then(async (response) => {
        const text = await response.text();
        try {
          const parsed = JSON.parse(text) as AboutData;
          setAbout(parsed);
        } catch {
          setAbout(null);
          setFallbackText(text);
        }
      })
      .catch(() => {
        setAbout(null);
      });
  }, []);

  if (about) {
    return (
      <>
        <p>{about.name}</p>
        <p>{about.description}</p>
        <p>{about.location}</p>
        <p>{about.email}</p>
        <p>{about.twitter_username}</p>
        <p>{about.public_repos}</p>
        <p>{about.html_url}</p>
        <p>{about.avatar_url}</p>
        <p>{about.readme}</p>
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
