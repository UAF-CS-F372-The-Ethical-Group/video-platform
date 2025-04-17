/**
 * Contains definitions for the like button component
 */

import { Like, Movie } from "../../types.ts";

export enum LikeButtonAction {
  LIKE = "like",
  DISLIKE = "dislike",
  REMOVE = "remove",
}

/**
 * 
 * Generates html with data for the like button injected into it.
 * 
 * @param movie
 * @param Like 
 * @returns 
 */

export default function LikeButtons(
  { movie, like }: { movie: Movie; like?: Like },
) {
  const movieId = movie._id.toString();
  return (
    <div>
      <form>
        <input type="hidden" name="movie" value={movieId} />
        <input
          type="hidden"
          name="action"
          value={like?.status
            ? LikeButtonAction.REMOVE
            : LikeButtonAction.LIKE}
        />
        <input
          type="submit"
          id="likeButton"
          value={like?.status === true ? "Unlike" : "Like"}
        />
      </form>
      <form>
        <input type="hidden" name="movie" value={movieId} />
        <input
          type="hidden"
          name="action"
          value={like?.status === false
            ? LikeButtonAction.REMOVE
            : LikeButtonAction.DISLIKE}
        />
        <input
          type="submit"
          id="dislikeButton"
          value={like?.status === false ? "Undislike" : "Dislike"}
        />
      </form>
    </div>
  );
}
