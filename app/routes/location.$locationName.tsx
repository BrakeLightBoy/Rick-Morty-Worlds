import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useState } from "react";


export const loader = async ({ params }: { params: { locationName: string } }) => {
  const { locationName } = params;

  const res = await fetch(`https://rickandmortyapi.com/api/location/?name=${locationName}`);
  const locationData = await res.json();
  
  const residents = locationData.results[0].residents;

  const characterData = [];

  for (let i = 0; i < residents.length; i++) {
    const res2 = await fetch(residents[i]);
    characterData.push(await res2.json());
  }
  
  const combinedData = {
    location: locationData,
    characters: characterData
  };
 
  return json(combinedData);
};

export default function LocationPage() {
    const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center gap-6">
      <header className="pt-10">
        <h1 className="text-3xl font-bold text-gray-100">{data.location.results[0].name}</h1>
      </header>
      <h2 className="text-xl font-bold text-gray-100">Inhabitants</h2>
      <div className="w-full flex justify-center">
        <ul className="pt-6">
            {data.characters.map((resident: any) => (
              <li key={resident.id} className="text-gray-100 pt-2">
                  <img className="h-20 max-w-full rounded-lg inline" src={resident.image}></img> 
                  <h3 className="inline whitespace-nowrap pl-5">{resident.name}</h3>
              </li>
            ))}
          </ul>
      </div>
      <div className="relative mx-auto h-20 w-60">
          <a className="absolute top-0 -left-full p-6 bg-gray-100 text-sm" href="/">Back</a>
      </div>
    </div>
    
  );
}