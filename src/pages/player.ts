import { ObjectId } from "mongodb";
import { likeCollection, movieCollection } from "../mongodb.ts";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Movie } from "../types.ts";
import { Request, Response } from "express";

function generateVideoHtml(movie: Movie) {
  return `<div _id="video_player">
            <h1>${movie.title}<\h1>
            <video controls="" autoplay="" width="250">
                <source src="${movie.videoPath}" type="video/mp4">
            </video>
        </div>`;
}

function generateLikesHtml(movie: Movie) {
  return `<div>
        <form>
        <input type="hidden" name="movie" value="${movie._id}">
        <input type="hidden" name="action" value="like">
        <input type="submit" id="likeButton" value="Like">
        </form>
        <form>
        <input type="hidden" name="movie" value="${movie._id}">
        <input type="hidden" name="action" value="dislike">
        <input type="submit" id="dislikeButton" value="Dislike">
        </form>
    </div>`;
}

export async function playerHandler(request: Request, response: Response) {
  if (request.session.userId == null) {
    response.redirect("/login.html");
    return;
  }
  const movieId = request.query.movie?.toString();
  const movie = await movieCollection.findOne<Movie>(
    { _id: new ObjectId(movieId) },
  );
  if (movie == null) {
    response.redirect("/gallery.html");
    return;
  }
  const actionValue = request.query.action;
  if (actionValue != null) {
    await likeCollection.updateOne(
      {
        movieId: new ObjectId(movieId),
        userId: new ObjectId(request.session.userId),
      },
      { $set: { status: actionValue === "like" } },
      { upsert: true },
    );
  }

  const likes = await likeCollection.findOne(
    { movieId: new ObjectId(movieId) },
  );

  const videoHtml = generateVideoHtml(movie);

  const likesHtml = generateLikesHtml(movie);

  const templatePlayerHtml = await readFile(join(
    import.meta.dirname!,
    "../static/player.html",
  ));

  const playerRenderedHtml = templatePlayerHtml.toString().replace(
    "<!--Video Player Slot-->",
    videoHtml,
  ).replace(
    "<!--Video Likes Slot-->",
    likesHtml,
  );
  response.send(playerRenderedHtml).end();
}
