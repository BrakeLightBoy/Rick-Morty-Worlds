import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useState } from "react";


export const loader = async ({ params }: { params: { locationName: string } }) => {
  const { locationName } = params;
  console.log(params.locationName)

  const res = await fetch(`https://rickandmortyapi.com/api/location/?name=${locationName}`);
  const data = await res.json();
  console.log(data)
  return json(data);
};

export default function LocationPage() {
    const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center gap-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-100">{data.results[0].name}</h1>
      </header>
      <div className="relative mx-auto h-20 w-60">
        <a className="absolute top-0 -left-full p-6 bg-gray-100 text-sm" href="/">Back</a>
      </div>
    </div>
    
  );
}