import { useRetrieveTrendingMovies } from "../service/tmdb";

export default function Movies() {
  const { data } = useRetrieveTrendingMovies();

  return (
    <>
      {data &&
        data.results.map((movie) => {
          return <div key={movie.id}>{movie.title}</div>;
        })}
    </>
  );
}
