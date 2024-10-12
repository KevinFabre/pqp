import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB8_API_KEY;

type Movie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  genre_ids: number[];
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type RetrieveTrendingMovies = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_result: number;
};

async function retrieveTrendingMovies(
  timeWindow: "day" | "week" = "day"
): Promise<RetrieveTrendingMovies> {
  const response = await fetch(`${BASE_URL}trending/movie/${timeWindow}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const data = await response.json();
  return data;
}

function useRetrieveTrendingMovies() {
  const query = useQuery({
    queryKey: ["useRetrieveTrendingMovies"],
    queryFn: () => retrieveTrendingMovies(),
  });
  return query;
}

export { useRetrieveTrendingMovies };
