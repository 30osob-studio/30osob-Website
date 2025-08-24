import { useState, useEffect } from "react";
import "./App.css";

interface ApiData {
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
  const [data, setData] = useState<ApiData | null>(null);

  useEffect(() => {
    console.log("Rozpoczynam fetch...");

    // Użyj proxy lokalnie, Vercel Function na produkcji
    const apiUrl = import.meta.env.DEV ? "/api/about" : "/api/proxy";

    fetch(apiUrl)
      .then((response) => {
        console.log("Odpowiedź:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log("Dane z API:", result);
        setData(result);
      })
      .catch((error) => {
        console.error("Błąd:", error);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Dane z API</h1>
        {data && (
          <div>
            <h2>{data.name}</h2>
            <p>
              <strong>Opis:</strong> {data.description}
            </p>
            <p>
              <strong>Lokalizacja:</strong> {data.location}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Repozytoria:</strong> {data.public_repos}
            </p>
            <a href={data.html_url} target="_blank" rel="noopener noreferrer">
              Profil GitHub
            </a>
            <br />
            <img
              src={data.avatar_url}
              alt="Avatar"
              style={{ width: 100, height: 100, borderRadius: "50%" }}
            />
          </div>
        )}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
}

export default App;
