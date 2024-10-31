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
        <div className="w-full">
          <form className="flex justify-center" onSubmit={handleRetrieveLocations}>
            <input 
            className="h-7 w-1/3 pl-3 focus:w-2/3 focus:h-10 transition-all duration-300 ease-in-out" 
            type="text" id="worldname" 
            placeholder=" World Name" 
            onChange={(e) => setLocationName(e.target.value)}>
            </input>
            <button className="transition ease-in-out bg-gray-100 ml-4 w-1/6 rounded">Search</button>
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