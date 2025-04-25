"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { decodeJwt } from "jose";
import AnimeCard from "./AnimeCard";
import AnimeCardSkeleton from "./AnimeCardSkeleton";

const VIEWER_QUERY = `
  query ($userId: Int) {
    User(id: $userId) {
      id
      name
      avatar {
        large
      }
      bannerImage
    }
    MediaListCollection(userId: $userId, type: ANIME) {
      lists {
        name
        entries {
          media {
            id
            title {
              english
              romaji
            }
            coverImage {
              large
            }
            status
            episodes
            seasonYear
            averageScore
          }
        }
      }
    }
  }
`;

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [animeLists, setAnimeLists] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Currently Watching");

  const token = Cookies.get("anilistAuthToken");

  // Decode JWT properly using `jose`
  const getUserIdFromToken = (token) => {
    if (!token) return null;
    try {
      const decoded = decodeJwt(token);
      return decoded?.sub || null;
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      return null;
    }
  };

  const userId = getUserIdFromToken(token);

  useEffect(() => {
    if (!token || !userId) return;

    const fetchData = async () => {
      try {
        const response = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query: VIEWER_QUERY, variables: { userId } }),
        });

        const { data } = await response.json();

        if (!data?.User) throw new Error("User not found");

        setUserData(data.User);
        setAnimeLists(data.MediaListCollection.lists);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, userId]);

  if (!token) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
          <div className="bg-zinc-900 rounded-xl p-3 shadow hover:shadow-lg transition-all">
          <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
              {loading ? (
          <div className="animate-pulse">
          <div className="h-40 bg-gray-700"></div>
          <div className="relative flex justify-center -mt-10">
          <div className="w-20 h-20 bg-gray-600 rounded-full"></div>
      </div>
    </div>
      ) : (
        <>
        <div className="relative">
        <img
          src={userData?.bannerImage}
          alt="Banner"
          className="w-full h-44 sm:h-60 md:h-72 object-cover"
        />
        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <img
            src={userData?.avatar?.large}
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-black shadow-md"
          />
        </div>
      </div>

      <div className="text-center mt-16">
        <h1 className="text-2xl font-bold tracking-wide">{userData?.name || "Unknown User"}</h1>
      </div>

        </>
      )}

 <div className="mt-8 px-4 max-w-7xl mx-auto">
    <div className="flex overflow-x-auto space-x-3 pb-4 scrollbar-hide">
      {["Currently Watching", "Planning", "Completed", "Dropped", "Paused", "Repeating"].map(
        (category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
              ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow"
                  : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
              }`}
          >
            {category}
          </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <AnimeCardSkeleton key={i} />)
            : animeLists
                ?.find((list) => list.name.toLowerCase().includes(selectedCategory.toLowerCase()))
                ?.entries?.map((entry) => (
                  <AnimeCard
                    key={entry.media.id}
                    data={{
                      id: entry.media.id,
                      image: entry.media.coverImage.large,
                      title: {
                        english: entry.media.title.english || "",
                        romaji: entry.media.title.romaji || "",
                      },
                      status: entry.media.status || "Unknown",
                      releaseDate: entry.media.seasonYear?.toString() || "",
                      totalEpisodes: entry.media.episodes || 0,
                      rating: entry.media.averageScore?.toString() || "N/A",
                    }}
                  />
                ))}
        </div>

        {!animeLists?.find((list) => list.name.toLowerCase().includes(selectedCategory.toLowerCase()))?.entries
          ?.length && (
          <div className="text-center text-gray-400 mt-6">
            <p>No anime found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProfilePage;
