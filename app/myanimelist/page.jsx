// app/myanimelist/page.jsx
import { cookies } from "next/headers";
import AnimeListGrid from "./AnimeListGrid"; // We’ll make this next

export default async function MyAnimeListPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("anilist_token")?.value;

  if (!token) {
    return (
      <div className="text-center mt-10 text-red-600">
        🔒 You must be logged in with AniList to view your anime list.
      </div>
    );
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_DEPLOYMENT_URL}/api/myanimelist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ access_token: token }),
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok) {
    return (
      <div className="text-center mt-10 text-red-600">
        ❌ Failed to load anime list: {json?.error || "Unknown error"}
      </div>
    );
  }

  const animeLists = json?.Viewer?.animeList?.lists || [];

  return <AnimeListGrid lists={animeLists} />;
}
