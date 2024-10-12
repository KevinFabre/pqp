import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { moviesQueryOptions } from "../service/tmdb";

export const Route = createFileRoute("/")({
  component: Index,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(moviesQueryOptions()),
});

function Index() {
  const { data: movies } = useSuspenseQuery(moviesQueryOptions());

  return (
    <>
      {movies &&
        movies.results.map((movie) => {
          return (
            <Link
              to={`/movie/$movieId`}
              params={{ movieId: movie.id.toString() }}
            >
              <div key={movie.id}>{movie.title}</div>
            </Link>
          );
        })}
    </>
  );
}
