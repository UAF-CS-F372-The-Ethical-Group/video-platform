import { Movie } from "../../types.ts";

export interface LikeCounts {
  likes: number
  dislikes: number
}

export type LikeMap = Map<string, LikeCounts>

function ListingRow({ movie, likes }: { movie: Movie, likes?: LikeCounts }) {
  likes ??= { likes: 0, dislikes: 0}
  return (
    <tr>
      <td>
        <img src={movie.thumbnailPath} alt={movie.title} width="300" />
      </td>
      <td>
        <h3>Title: {movie.title}</h3>
        <div>Likes: {likes.likes} Dislikes: {likes.dislikes}</div>
        <form method="POST">
          <input type="hidden" name="movie" value={movie._id.toString()} />
          <label for={"comment_" + movie._id}>Comment:</label>
          <textarea
            name="comment"
            id={"comment_" + movie._id}
            placeholder="No comment has been provided."
            autocomplete="off"
          >
            {movie.comment}
          </textarea>
          <input type="submit" id="commentSubmit" value="Submit comment" />
        </form>
      </td>
    </tr>
  );
}

export default function Listing({ movies, likeMap }: { movies: Movie[], likeMap: LikeMap  }) {
  console.log(likeMap)
  return (
    <>
      <h1>Yippie!</h1>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => <ListingRow key={m._id} movie={m} likes={likeMap.get(m._id.toString())} />)}
        </tbody>
      </table>
    </>
  );
}
