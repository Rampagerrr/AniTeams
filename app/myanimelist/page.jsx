"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AnimeCastAndCrew from "./AnimeCastAndCrew.jsx";

export default function MyAnimeListPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("anilistAuthToken");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/myanimelist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching anime list:", err);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <p className="text-center text-white">Loading...</p>;

  if (!token) {
    return (
      <p className="text-center text-red-500">
        🔒 You must be logged in with AniList to view your anime list.
      </p>
    );
  }

  return <AnimeCastAndCrew data={data} />;
}
