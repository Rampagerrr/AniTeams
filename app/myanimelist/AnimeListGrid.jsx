// app/myanimelist/AnimeListGrid.jsx
"use client";

import Image from "next/image";

export default function AnimeListGrid({ lists }) {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">📺 Your AnimeList</h1>

      {lists.map((group) => (
        <div key={group.name} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{group.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {group.entries.map(({ media }) => (
              <div key={media.id} className="bg-white rounded-xl shadow p-2">
                <Image
                  src={media.coverImage.large}
                  alt={media.title.romaji || media.title.english}
                  width={150}
                  height={200}
                  className="rounded-md mx-auto"
                />
                <h3 className="text-sm mt-2 text-center font-medium">
                  {media.title.romaji || media.title.english}
                </h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
