/**
 *  Contains logic for the video edit page including updating
 *  movie metadata in the database and deleting movies.
 */
import { Request, Response } from "express";
import { movieCollection, userCollection } from "../mongodb.ts";
import { renderPage } from "../htmlRenderer.ts";
import { ObjectId } from "mongodb";
import { Movie, User, UserRole } from "../types.ts";
import EditPage from "../components/listing/EditPage.tsx";

/**
 *  Render edit page after a permissions check
 */
export async function editGet(request: Request, response: Response) {
  const user = await userCollection.findOne<User>({
    _id: new ObjectId(request.session.userId),
  });
  if (user == null || ![UserRole.EDITOR].includes(user?.role!)) {
    response.status(403);
    response.send("Unauthorized");
    response.redirect("/login.html");
    return;
  }

  const movie = await movieCollection.findOne<Movie>({
    _id: new ObjectId(request.params.movieId),
  });
  if (!movie) {
    response.status(404);
    response.send("Video not found");
    response.redirect("/listing.html");
    return;
  }

  response.setHeader("content-type", "text/html");
  response.send(renderPage(EditPage({ movie })));
}

/**
 * Handle edits and deletion of movie metadata with a POST request.
 */
export async function editPost(request: Request, response: Response) {
  const user = await userCollection.findOne<User>({
    _id: new ObjectId(request.session.userId),
  });
  if (user?.role != UserRole.EDITOR) {
    response.status(403);
    response.send("Unauthorized");
    response.redirect("/login.html");
    return;
  }

  const { title, genre, filePath, mimeType, thumbnailPath, action } =
    request.body;

  if (action === "Delete") {
    await movieCollection.deleteOne({
      _id: new ObjectId(request.params.movieId),
    });
    response.redirect("/listing.html");
    return;
  }

  await movieCollection.updateOne({
    _id: new ObjectId(request.params.movieId),
  }, {
    $set: {
      title: title,
      genre: genre,
      videoPath: filePath,
      videoMimeType: mimeType,
      thumbnailPath: thumbnailPath,
    },
  });

  response.redirect("/listing.html");
}
