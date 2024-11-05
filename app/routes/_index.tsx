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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; 
  const totalPages = Math.ceil(locations.length / itemsPerPage);
  const numberOfItems = locations.length;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = locations.slice(startIndex, endIndex);
  

  const handleRetrieveLocations = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await fetch("https://rickandmortyapi.com/api/location/?name=" + locationName);
      const data = await res.json();
      if(data != undefined){
        setLocations(data.results);
      }
    } catch (error){
      console.log("Failed to retrieve data", error);
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

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
          <table className="table-auto w-full pt-6 text-gray-100 ">
            <thead className={`${numberOfItems === 0 ? 'hidden' : ''}`}>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Dimension</th>
                <th className="px-4 py-2 text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((location: any) => (
                <tr key={location.id} className="hover:bg-green-800">
                  <td className="border-t border-b px-4 py-2">
                    <a href={`/location/${location.name}`} className="text-blue-400 hover:underline">
                      {location.name}
                    </a>
                  </td>
                  <td className="border-t border-b px-4 py-2">{location.dimension || "Unknown"}</td>
                  <td className="border-t border-b px-4 py-2">{location.type || "Unknown"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={`pagination-controls pt-4 flex justify-center ${numberOfItems === 0 ? 'hidden' : ''}`}>
            <button 
              onClick={goToPreviousPage} 
              disabled={currentPage === 1} 
              className="px-4 py-2 mr-2 text-gray-100 bg-gray-600 rounded"
            >
              Previous
            </button>
            <span className="text-gray-100">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={goToNextPage} 
              disabled={currentPage === totalPages} 
              className="px-4 py-2 ml-2 text-gray-100 bg-gray-600 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}