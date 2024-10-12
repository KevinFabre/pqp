import { useMemo, useState } from "react";
import { debounce } from "lodash";
import { useRetrieveSearchMovie } from "../service/tmdb";

const SUGGESTION_COUNT = 5;
const DELAY = 300;

export default function SearchInput() {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

  const { data: movies } = useRetrieveSearchMovie(debouncedSearchValue);

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
    return movies?.results.slice(0, SUGGESTION_COUNT - 1) || [];
  }, [movies]);

  return (
    <div>
      <input
        value={searchValue}
        onChange={onChange}
        type="text"
        name="search-movie"
      />
      {suggestedMovies.map((movie) => {
        return <h3 key={movie.id}>{movie.title}</h3>;
      })}
    </div>
  );
}
