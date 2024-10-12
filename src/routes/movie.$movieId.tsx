import { createFileRoute } from "@tanstack/react-router";
import { movieQueryOptions } from "../service/tmdb";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/movie/$movieId")({
  loader: ({ context: { queryClient }, params: { movieId } }) => {
    return queryClient.ensureQueryData(
      movieQueryOptions(Number.parseInt(movieId))
    );
  },
  component: Movie,
});

function Movie() {
  const movieId = Route.useParams().movieId;
  const { data: movie } = useSuspenseQuery(
    movieQueryOptions(Number.parseInt(movieId))
  );

  return (
    <div>
      <h4 className="text-xl font-bold underline">{movie.title}</h4>
    </div>
  );
}
