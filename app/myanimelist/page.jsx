"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AnimeListGrid from "./AnimeListGrid";

export default function MyAnimeListPage() {
  const [animeLists, setAnimeLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("anilistAuthToken");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/myanimelist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: token }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAnimeLists(data?.animeList?.lists || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch anime list:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!animeLists.length) return <p className="text-center text-red-500">No anime found in your list</p>;

  return <AnimeListGrid lists={animeLists} />;
}
