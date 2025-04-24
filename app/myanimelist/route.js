// app/api/myanimelist/route.js
import { NextResponse } from "next/server";
import { fetchAnimeData } from "@/lib/fetchAnimeData"; // adjust import as needed

export async function GET(req) {
  const animeId = 1; // You can get this from query params or request body
  const data = await fetchAnimeData(animeId);

  if (!data) return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });

  return NextResponse.json(data);
}
