"use client";

import Image from "next/image";

export default function AnimeCastAndCrew({ data }) {
  if (!data) return <p className="text-center text-red-500">No data available</p>;

  const { characters, staff } = data;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🎭 Characters & Voice Actors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters?.edges.map(({ node, voiceActors }) => (
          <div key={node.id} className="bg-white rounded-2xl shadow-md p-4">
            <div className="flex items-center gap-4 mb-2">
              <Image
                src={node.image.large}
                alt={node.name.full}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{node.name.full}</h3>
              </div>
            </div>
            {voiceActors[0] && (
              <div className="flex items-center gap-4">
                <Image
                  src={voiceActors[0].image.large}
                  alt={voiceActors[0].name.full}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-600">Voice Actor (JP):</p>
                  <p className="font-medium">{voiceActors[0].name.full}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">🎬 Staff</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {staff?.edges.map(({ node }) => (
          <div key={node.id} className="text-center">
            <Image
              src={node.image.large}
              alt={node.name.full}
              width={80}
              height={80}
              className="rounded-full mx-auto"
            />
            <p className="mt-2 text-sm font-medium">{node.name.full}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
