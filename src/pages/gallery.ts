import { Document, ObjectId } from "mongodb";

import { getMovies, likeCollection, userCollection } from "../mongodb.ts";
import { Like, Movie } from "../types.ts";
import { Request, Response } from "express";
import GalleryPage from "../components/gallery/GalleryPage.tsx";
import { renderPage } from "../htmlRenderer.ts";

/**
 * Fetch the favorite movies for the specified user
 */
async function getFavorites(
  userId: ObjectId,
  filter: string,
): Promise<Movie[]> {
  const pipeline: Document[] = [
    {
      $match: {
        userId: userId,
        status: true,
      },
    },
    {
      $lookup: {
        from: "movies",
        localField: "movieId",
        foreignField: "_id",
        as: "movieDocument",
      },
    },
    { $sort: { "movieDocument.title": 1 } },
  ];
  if (filter) {
    pipeline.push({
      $match: {
        "movieDocument.title": {
          $regex: filter,
          $options: "i",
        },
      },
    });
  }
  const movieLikesCursor = likeCollection.aggregate<
    Like & { movieDocument: Movie[] }
  >(pipeline);
  const movieLikes = await movieLikesCursor.toArray();
  return movieLikes.map((like) => like.movieDocument).flat();
}

/**
 * Checks user authentication and then returns an HTML page with the
 * user's favorite movies, and a list of all movies. They are sorted
 * alphabetically, and filtered according to the `search` query
 * parameter.
 */
export async function renderGallery(request: Request, response: Response) {
  const user = await userCollection.findOne({
    _id: new ObjectId(request.session.userId),
  });
  if (user == null) {
    response.redirect("/login.html");
    return;
  }

  const searchString = request.query.search?.toString() ?? "";

  const favoriteMovies = await getFavorites(user._id, searchString);
  const allMovies = await getMovies(searchString);

  response.setHeader("content-type", "text/html")
  response.send(renderPage(
    GalleryPage({
      favorites: favoriteMovies,
      movies: allMovies,
      search: searchString,
    }),
  ));
}
