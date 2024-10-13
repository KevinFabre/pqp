import { createFileRoute, Link } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";

import SearchInput from "@/components/SearchInput";
import MovieCard from "@/components/MovieCard";

import { trendingMoviesInfiniteOptions } from "@/service/tmdb";
import { useCallback, useEffect, useRef } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const {
    data: movies,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(trendingMoviesInfiniteOptions());

  const observerRef = useRef(null);

  const handleIntersect: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px 0px 200px 0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
  }, [handleIntersect]);

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
            movies.pages.map((page) =>
              page.results.map((movie) => {
                return (
                  <Link
                    key={movie.id}
                    to={`/movie/$movieId`}
                    params={{ movieId: movie.id.toString() }}
                  >
                    <MovieCard movie={movie} />
                  </Link>
                );
              })
            )}
        </div>
        <div ref={observerRef} />
      </section>
    </div>
  );
}
