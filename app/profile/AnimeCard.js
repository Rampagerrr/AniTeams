import Link from "next/link";
import { FaCalendar, FaBook, FaStar, FaPlay } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Status from "./ui/status";

function AnimeCard({ data }) {
  if (!data || !data.id) {
    return null; // Prevent rendering if data is missing
  }

  const type = {
    TV: "TV",
    MOVIE: "Movie",
    OVA: "OVA",
    ONA: "ONA",
    SPECIAL: "Special",
  };

  return (
    <Link href={`/anime/${data.id}`}>
      <div className="sm:p-3 w-full">
        <div className="overflow-hidden relative rounded-lg aspect-[5/7]">
          <div className="group absolute inset-0">
            <div className="transition-all transform duration-300 group-hover:scale-105 group-hover:brightness-50">
              <LazyLoadImage
                effect="blur"
                className="w-full h-full aspect-[5/7] object-cover rounded-lg"
                src={data.image || "/placeholder.jpg"} // Fallback image
                alt="Anime Cover"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaPlay className="text-4xl" />
            </div>
          </div>
        </div>
              <div className="mt-2 relative group w-full">
                <div className="rounded-md flex items-center space-x-1 relative">
                  <Status status={data.status || "Unknown"} />
              
                  {/* Bungkus teks judul di dalam container agar tidak overflow */}
                  <div className="relative overflow-hidden max-w-full">
                    <p
                      className="transition-all duration-300 ease-in-out text-sm font-bold text-primary dark:text-secondary p-1 rounded line-clamp-1
                                 group-hover:line-clamp-none group-hover:bg-neutral-800 group-hover:shadow-md group-hover:whitespace-normal"
                      style={{ zIndex: 20, position: 'relative' }}
                    >
                      {data?.title?.english || data?.title?.romaji || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
        <div className="text-xs sm:text-sm flex space-x-2 mt-2 select-none">
          {data.releaseDate && (
            <p
              title={`Released: ${data.releaseDate}`}
              className="dark:text-secondary text-primary flex items-center"
            >
              <FaCalendar />
              <span className="ml-1">{data.releaseDate}</span>
            </p>
          )}
          {data.totalEpisodes && data.totalEpisodes !== 1 && (
            <p
              title={`Episodes: ${data.totalEpisodes}`}
              className="dark:text-secondary text-primary flex items-center"
            >
              <FaBook />
              <span className="ml-1">{data.totalEpisodes}</span>
            </p>
          )}
          {data.rating && (
            <p
              title={`Rating: ${data.rating}`}
              className="dark:text-secondary text-primary flex items-center"
            >
              <FaStar />
              <span className="ml-1">{data.rating}</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default AnimeCard;
