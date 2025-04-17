import { ObjectId } from "mongodb";
import { likeCollection, movieCollection, userCollection } from "../mongodb.ts";
import { Like, Movie } from "../types.ts";
import { Request, Response } from "express";
import { LikeButtonAction } from "../components/player/LikeButtons.tsx";
import VideoPage from "../components/player/VideoPage.tsx";
import { renderPage } from "../htmlRenderer.ts";

export async function playerHandler(request: Request, response: Response) {
  const user = await userCollection.findOne({
    _id: new ObjectId(request.session.userId),
  });
  if (user == null) {
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

  const likeFilter = {
    movieId: movie._id,
    userId: user._id,
  };

  const actionValue = request.query.action as LikeButtonAction;
  if (actionValue != null) {
    if (actionValue === LikeButtonAction.REMOVE) {
      await likeCollection.deleteOne(likeFilter);
    } else {
      await likeCollection.updateOne(
        likeFilter,
        { $set: { status: actionValue === LikeButtonAction.LIKE } },
        { upsert: true },
      );
    }
  }

  const userLike = await likeCollection.findOne<Like>(
    likeFilter,
  );

  response.setHeader("content-type", "text/html");
  response.send(renderPage(
    VideoPage({ movie, like: userLike ?? undefined }),
  )).end();
}
