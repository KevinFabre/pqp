import { useMemo, useState } from "react";
import { debounce } from "lodash";
import { Star } from "lucide-react";
import classNames from "classnames";
import { Link } from "@tanstack/react-router";

import { MoviePreview, useRetrieveSearchMovie } from "@/service/tmdb";

const SUGGESTION_COUNT = 3;
const DELAY = 300;

function MovieMiniCard({ movie }: { movie: MoviePreview }) {
  return (
    <Link
      key={movie.id}
      to={`/movie/$movieId`}
      params={{ movieId: movie.id.toString() }}
    >
      <div className="flex p-2 border-b-2 border-gray-600 gap-2">
        {
          <div className="relative w-16 aspect-poster shrink-0">
            <div
              className="absolute inset-0 bg-cover bg-center overflow-hidden rounded"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w200${movie.poster_path})`,
              }}
            />
          </div>
        }
        <div className="flex flex-col">
          <h3 className="font-semibold">{movie.title}</h3>
          {movie.release_date && (
            <div className="text-sm">
              {Intl.DateTimeFormat(navigator.language, {
                year: "numeric",
              }).format(new Date(movie.release_date))}
            </div>
          )}
          <div className="grow"></div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function SearchInput() {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

  const {
    data: movies,
    isFetched,
    isLoading,
  } = useRetrieveSearchMovie(debouncedSearchValue);

  const debouncedSetSearchValue = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchValue(value);
      }, DELAY),
    []
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    debouncedSetSearchValue(value);
  };

  const suggestedMovies = useMemo(() => {
    return movies?.results.slice(0, SUGGESTION_COUNT) || [];
  }, [movies]);

  return (
    <div className="relative text-gray-800 w-full max-w-96">
      <input
        value={searchValue}
        onChange={onChange}
        type="text"
        name="search-movie"
        className={classNames(
          "w-full borderborder-gray-600 bg-gray-300 rounded-lg px-6 py-3 placeholder-gray-500",
          {
            "rounded-b-none": !!debouncedSearchValue,
          }
        )}
        placeholder="Search for a movie"
      />
      {!!debouncedSearchValue && (
        <div className="absolute z-10 top-13 left-0 bg-gray-400 right-0 rounded-b-lg">
          {suggestedMovies.map((movie) => {
            return <MovieMiniCard key={movie.id} movie={movie} />;
          })}
          {isFetched && suggestedMovies.length === 0 && (
            <div className="italic p-2">No movies found</div>
          )}
          {isLoading && <div className="italic p-2">Searching movies...</div>}
        </div>
      )}
    </div>
  );
}
