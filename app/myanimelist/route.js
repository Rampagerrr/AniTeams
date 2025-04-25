// app/api/myanimelist/route.js
import { NextResponse } from "next/server";
import { fetchAnimeData } from "app/actions/aniListFetch.js"; // <-- adjust the path to wherever your fetch function is

export async function GET(req) {
  const animeId = 1; // Replace this with dynamic logic if needed
  const data = await fetchAnimeData(animeId);

  if (!data) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }

  return NextResponse.json(data);
}
