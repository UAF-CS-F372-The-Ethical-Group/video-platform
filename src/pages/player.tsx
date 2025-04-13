import { ObjectId } from "mongodb";
import { likeCollection, movieCollection, userCollection } from "../mongodb.ts";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Like, Movie } from "../types.ts";
import { Request, Response } from "express";
import { render } from "preact-render-to-string";
import LikeButtons, { LikeButtonAction } from "../components/LikeButtons.tsx";
import { GenerateVideoHtml } from "../components/VideoPlayer.tsx";

// function generateLikesHtml(movie: Movie, like?: Like) {
//   return render(LikeButtons({ movie, like }));
// }

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

  const renderedHtml = render(
    <>
      <GenerateVideoHtml movie={movie} />{" "}
      <LikeButtons movie={movie} like={userLike ?? undefined} />
    </>,
  );

  const templatePlayerHtml = await readFile(join(
    import.meta.dirname!,
    "../static/player.html",
  ));

  const playerRenderedHtml = templatePlayerHtml.toString().replace(
    "<!--Video Player Slot-->",
    renderedHtml,
  );

  response.send(playerRenderedHtml).end();

}
