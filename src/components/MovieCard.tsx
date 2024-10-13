import { MoviePreview } from "@/service/tmdb";

const IMAGE_BASE_PATH = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }: { movie: MoviePreview }) {
  return (
    <div className="relative overflow-hidden rounded-lg aspect-poster border border-gray-800">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${IMAGE_BASE_PATH}${movie.poster_path})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-4">
        <h2 className="text-lg font-semibold text-white">{movie.title}</h2>
      </div>
    </div>
  );
}
