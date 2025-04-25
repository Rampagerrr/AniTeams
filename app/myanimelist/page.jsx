// app/myanimelist/page.jsx
import AnimeCastAndCrew from "./AnimeCastAndCrew.jsx"; // Adjust if needed
import { fetchAnimeData } from "app/actions/aniListFetch.js"; // Make sure path is correct

export default async function MyAnimeListPage() {
  const animeId = 1; // You could also get this from a URL param or search param
  const data = await fetchAnimeData(animeId);

  return <AnimeCastAndCrew data={data} />;
}
