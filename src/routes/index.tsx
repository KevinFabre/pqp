import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import SearchInput from "../components/SearchInput";
import { moviesQueryOptions } from "../service/tmdb";

export const Route = createFileRoute("/")({
  component: Index,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(moviesQueryOptions()),
});

function Index() {
  const { data: movies } = useSuspenseQuery(moviesQueryOptions());

  return (
    <main>
      <section>
        <SearchInput />
      </section>
      <section>
        {movies &&
          movies.results.map((movie) => {
            return (
              <Link
                key={movie.id}
                to={`/movie/$movieId`}
                params={{ movieId: movie.id.toString() }}
              >
                <div>{movie.title}</div>
              </Link>
            );
          })}
      </section>
    </main>
  );
}
