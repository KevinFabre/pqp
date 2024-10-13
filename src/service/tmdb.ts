import { queryOptions, useQuery } from "@tanstack/react-query";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB8_API_KEY;

export type MoviePreview = {
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

type RetrieveMovies = {
  page: number;
  results: MoviePreview[];
  total_pages: number;
  total_result: number;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

async function retrieveTrendingMovies(
  timeWindow: "day" | "week" = "day"
): Promise<RetrieveMovies> {
  const response = await fetch(`${BASE_URL}trending/movie/${timeWindow}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const data = await response.json();
  return data;
}

async function retrieveMovie(id: number): Promise<Movie> {
  const response = await fetch(`${BASE_URL}movie/${id}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const data = await response.json();
  return data;
}

async function retrieveSearchMovies(query: string): Promise<RetrieveMovies> {
  const response = await fetch(`${BASE_URL}search/movie?query=${query}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const data = await response.json();
  return data;
}

const moviesQueryOptions = () =>
  queryOptions({
    queryKey: ["movies"],
    queryFn: () => retrieveTrendingMovies(),
  });

const movieQueryOptions = (movieId: number) =>
  queryOptions({
    queryKey: ["movie", { movieId }],
    queryFn: () => retrieveMovie(movieId),
  });

const useRetrieveSearchMovie = (query: string) => {
  return useQuery({
    queryKey: ["searchMovie", query] as const,
    queryFn: ({ queryKey }) => retrieveSearchMovies(queryKey[1]),
    enabled: !!query,
  });
};

export { moviesQueryOptions, movieQueryOptions, useRetrieveSearchMovie };
