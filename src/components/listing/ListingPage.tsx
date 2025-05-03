/**
 * Contains components pertaining to the backoffice listing pages
 */

import { VNode } from "preact";
import { Movie, UserRole } from "../../types.ts";
import Head from "../Head.tsx";

/** An object representing the number of likes on a video */
export interface LikeCounts {
  /** The number of likes */
  likes: number;
  /** The number of dislikes */
  dislikes: number;
}

/** A map of like counts according to video id */
export type LikeMap = Map<string, LikeCounts>;

/** Render a row for the given movie */
function ListingRow(
  { movie, likes, currentRole }: {
    movie: Movie;
    likes?: LikeCounts;
    currentRole: UserRole;
  },
) {
  likes ??= { likes: 0, dislikes: 0 };
  return (
    <tr>
      <td>
        <img
          src={movie.thumbnailPath}
          alt={movie.title}
          width="300"
        />
      </td>
      <td>
        <h3>
          <a href={`/player.html/?movie=${movie._id}`}>
            Title: {movie.title}
          </a>
        </h3>
        {currentRole !== UserRole.MARKETING ? null : (
          <>
            <div>Likes: {likes.likes}</div>
            <div>Dislikes: {likes.dislikes}</div>
          </>
        )}
        <form method="POST">
          <input
            type="hidden"
            name="movie"
            value={movie._id.toString()}
          />
          <label for={"comment_" + movie._id}>Comment:</label>
          <textarea
            name="comment"
            id={"comment_" + movie._id}
            placeholder="No comment has been provided."
            autocomplete="off"
            disabled={currentRole !== UserRole.MARKETING}
          >
            {movie.comment}
          </textarea>
          <input
            type="submit"
            id="commentSubmit"
            value="submit"
            hidden={currentRole !== UserRole.MARKETING}
          />
        </form>
        {currentRole !== UserRole.EDITOR ? null : (
          <form
            id="edit-button"
            action={`/edit/${movie._id}`}
            method="GET"
          >
            <input id="submit" type="submit" value="Edit" />
          </form>
        )}
      </td>
    </tr>
  );
}

/** Render the listing page, with comments and thumbnails */
export default function Listing(
  { movies, likeMap, currentRole }: {
    movies: Movie[];
    likeMap: LikeMap;
    currentRole: UserRole;
  },
): VNode {
  return (
    <>
      <Head>
        <title>Movie Listing</title>
      </Head>
      <h1>Movie Listing</h1>
      {currentRole !== UserRole.EDITOR
        ? null
        : (
          <form id="upload-button" action="/upload.html" method="GET">
            <input
              id="submit"
              type="submit"
              value="Upload New Video"
            />
          </form>
        )}
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <ListingRow
              key={m._id}
              movie={m}
              likes={likeMap.get(m._id.toString())}
              currentRole={currentRole}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
