/** Contains components pertaining to thumbnails */
import { Movie } from "../../types.ts";

/**
 * Generates HTML markup to render a thumbnail for the given movie
 */
export default function Thumbnail({ movie }: { movie: Movie }) {
  return (
    <div className="movie">
      <a href={`/player.html?movie=${movie._id}`}>
        <img src={movie.thumbnailPath} alt={movie.title} />
        <h3>{movie.title}</h3>
      </a>
    </div>
  );
}
