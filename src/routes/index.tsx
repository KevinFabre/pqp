import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import SearchInput from "@/components/SearchInput";
import MovieCard from "@/components/MovieCard";

import { moviesQueryOptions } from "@/service/tmdb";

export const Route = createFileRoute("/")({
  component: Index,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(moviesQueryOptions()),
});

function Index() {
  const { data: movies } = useSuspenseQuery(moviesQueryOptions());

  return (
    <div className="container m-auto my-12 px-2">
      <section className="flex items-center justify-center mb-8">
        <SearchInput />
      </section>
      <section>
        <h2 className="header text-xl md:text-4xl font-semibold mb-6">
          Trending movies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies &&
            movies.results.map((movie) => {
              return (
                <Link
                  key={movie.id}
                  to={`/movie/$movieId`}
                  params={{ movieId: movie.id.toString() }}
                >
                  <MovieCard movie={movie} />
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
}
