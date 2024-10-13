import {
  infiniteQueryOptions,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

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

type RetrieveCredits = {
  id: number; // Movie ID
  cast: CastMember[];
  crew: unknown[];
};

export type CastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

async function retrieveTrendingMovies(
  page: number = 1
): Promise<RetrieveMovies> {
  const response = await fetch(`${BASE_URL}trending/movie/day?page=${page}`, {
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

async function retrieveMovieCredits(movieId: number): Promise<RetrieveCredits> {
  const response = await fetch(`${BASE_URL}movie/${movieId}/credits`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  const data = await response.json();
  return data;
}

const trendingMoviesInfiniteOptions = () =>
  infiniteQueryOptions({
    queryKey: ["trendingMoviesInfinite"],
    queryFn: ({ pageParam }) => retrieveTrendingMovies(pageParam),
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => firstPage.page - 1,
    getNextPageParam: (lastPage) => lastPage.page + 1,
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

const useRetrieveMovieCredits = (movieId: number) => {
  return useQuery({
    queryKey: ["movieCreadits", movieId] as const,
    queryFn: ({ queryKey }) => retrieveMovieCredits(queryKey[1]),
  });
};

export {
  trendingMoviesInfiniteOptions,
  movieQueryOptions,
  useRetrieveSearchMovie,
  useRetrieveMovieCredits,
};
