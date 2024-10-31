import type { MetaFunction, LinksFunction } from "@remix-run/node";
import styles from '../styles/_index.css?url';
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Rick & Morty Worlds" },
    { name: "description", content: "Welcome to the world of Rick & Morty" },
  ];
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
  ];
};

export default function Index() {
  const [locations, setLocations] = useState<any[]>([]);
  const [locationName, setLocationName] = useState("");

  const handleRetrieveLocations = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await fetch("https://rickandmortyapi.com/api/location/?name=" + locationName);
      const data = await res.json();
      setLocations(data.results);
    } catch (error){
      console.log("Failed to retrieve data", error);
    }
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-5xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to Rick and Morty Worlds!
          </h1>
          <h2 className="text-2xl">
            Your one-stop shop for the worlds, dimensions, and characters. 
          </h2>
        </header>
        <div>
          <form onSubmit={handleRetrieveLocations}>
            <input type="text" id="worldname" placeholder="World Name" onChange={(e) => setLocationName(e.target.value)}></input>
            <button className="bg-gray-100">Search</button>
          </form>
          <ul>
            {locations.map((location: any) => (
              <li key={location.id} className="text-gray-100">
                <a href={`/location/${location.name}`}>Name: {location.name},
                   Dimension: {location.dimension}, 
                   Type: {location.type}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}