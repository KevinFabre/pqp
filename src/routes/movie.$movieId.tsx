import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Star, Clock, MoveLeft } from "lucide-react";

import {
  type Movie,
  type CastMember,
  movieQueryOptions,
  useRetrieveMovieCredits,
} from "@/service/tmdb";
import missingAvatar from "@/assets/missing-avatar.svg";

export const Route = createFileRoute("/movie/$movieId")({
  loader: ({ context: { queryClient }, params: { movieId } }) => {
    return queryClient.ensureQueryData(
      movieQueryOptions(Number.parseInt(movieId))
    );
  },
  component: Movie,
});

function Backdrop({
  backdropPath,
  title,
  tagline,
}: {
  title: string;
  backdropPath: string;
  tagline: string;
}) {
  return (
    <div
      className="h-[30vh] bg-cover bg-center relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdropPath})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
          {tagline && <p className="text-xl text-gray-300 italic">{tagline}</p>}
        </div>
      </div>
    </div>
  );
}

function Thumbnail({ movie }: { movie: Movie }) {
  return (
    <div className="bg-gray-800 rounded overflow-hidden flex flex-row md:block">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} poster`}
        className="w-1/3 shrink-0 md:w-full"
      />
      <div className="w-3/4 p-4 flex flex-col md:block md:w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="text-lg font-semibold">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{movie.runtime} min</span>
          </div>
        </div>
        <div className="grow md:hidden"></div>
        <p className="text-sm text-gray-400 mb-4">
          Released:{" "}
          {Intl.DateTimeFormat(navigator.language, {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(movie.release_date))}
        </p>
        <div className="flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <div key={genre.id} className="bg-gray-700 rounded-md py-1 px-2">
              {genre.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Actor({ actor }: { actor: CastMember }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="shrink-0 w-20 h-20 rounded-full bg-center bg-contain border border-gray-800"
        style={{
          backgroundImage: `url(${
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
              : missingAvatar
          })`,
        }}
      ></div>
      <div className="text-center">
        <div>{actor.name}</div>
        <div className="italic">{actor.character}</div>
      </div>
    </div>
  );
}

function Content({ movie }: { movie: Movie }) {
  const { data: credits, isFetched } = useRetrieveMovieCredits(movie.id);

  const creditOrderActors = useMemo(() => {
    return credits?.cast.sort((a, b) => a.order - b.order) || [];
  }, [credits]);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Overview</h2>
      <p className="text-gray-300 mb-6">{movie.overview}</p>
      <h2 className="text-2xl font-semibold mb-4">Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-semibold mb-2">Production Companies</h3>
          <ul className="list-disc list-inside text-gray-300">
            {movie.production_companies.map((company) => (
              <li key={company.name}>{company.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Production Countries</h3>
          <ul className="list-disc list-inside text-gray-300">
            {movie.production_countries.map((country) => (
              <li key={country.name}>{country.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Spoken Languages</h3>
          <ul className="list-disc list-inside text-gray-300">
            {movie.spoken_languages.map((language) => (
              <li key={language.english_name}>{language.english_name}</li>
            ))}
          </ul>
        </div>
      </div>
      {isFetched && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:col-6 gap-6">
            {creditOrderActors.map((actor) => (
              <Actor actor={actor} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

function Movie() {
  const movieId = Route.useParams().movieId;
  const { data: movie } = useSuspenseQuery(
    movieQueryOptions(Number.parseInt(movieId))
  );

  return (
    <div className="flex flex-col">
      <Backdrop
        backdropPath={movie.backdrop_path}
        title={movie.title}
        tagline={movie.tagline}
      />
      <div className="container mx-auto px-2 py-4 flex-grow md:px-4 md:py-8">
        <Link to="/">
          <div className="flex mb-4 md:mb-8">
            <MoveLeft />
            &nbsp;
            <span className="font-xl italic underline underline-offset-2">
              Back to trending movies
            </span>
          </div>
        </Link>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="md:w-1/3 xl:w-1/4">
            <Thumbnail movie={movie} />
          </div>
          <div className="md:w-2/3 xl:3/4">
            <Content movie={movie} />
          </div>
        </div>
      </div>
    </div>
  );
}
