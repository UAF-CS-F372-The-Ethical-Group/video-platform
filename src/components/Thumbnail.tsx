import { Movie } from "../types.ts";

/**
 * Generates HTML markup for the given movie
 * @param {Movie} movie
 */
export default function Thumbnail(movie: Movie) {
  return (
    <div className="movie">
      <a href={`/player.html?movie=${movie._id}`}>
        <img src={movie.thumbnailPath} alt={movie.title} />
        <h3>{movie.title}</h3>
      </a>
    </div>
  );
}
