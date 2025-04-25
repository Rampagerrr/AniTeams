"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";

export default function AnimeListGrid() {
  const [lists, setLists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get("anilistAuthToken");

    if (!token) {
      setError("Not logged in. Please login via AniList.");
      return;
    }

    fetch("/api/myanimelist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.animeList?.lists) {
          setLists(data.animeList.lists);
        } else {
          setError("Failed to load your anime list.");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Something went wrong while fetching your list.");
      });
  }, []);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!lists.length) {
    return <p className="text-center">Loading your anime list...</p>;
  }

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
                <p className="text-xs text-center text-gray-500">
                  {media.format} • {media.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
