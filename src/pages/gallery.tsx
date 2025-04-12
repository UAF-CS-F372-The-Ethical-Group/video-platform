import { Document, ObjectId } from "mongodb";
import { readFile } from "node:fs/promises";
import { render } from "preact-render-to-string";

import { likeCollection, movieCollection, userCollection } from "../mongodb.ts";
import { join } from "node:path";
import { Like, Movie } from "../types.ts";
import { Request, Response } from "express";
import Thumbnail from "../components/Thumbnail.tsx";

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
 * Fetch all movies, sorted alphabetically
 */
async function getMovies(filter: string): Promise<Movie[]> {
  const pipeline: Document[] = [{ $sort: { title: 1 } }];
  if (filter) {
    pipeline.unshift({
      $match: {
        title: {
          $regex: filter,
          $options: "i",
        },
      },
    });
  }
  const cursor = await movieCollection.aggregate<Movie>(pipeline);
  return await cursor.toArray();
}

/**
 * Checks user authentication and then returns an HTML page with the
 * user's favorite movies, and a list of all movies. They are sorted
 * alphabetically, and filtered according to the `search` query
 * parameter.
 * @param {*} request
 * @param {*} response
 * @returns
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
  const favoriteMoviesHtml = favoriteMovies.map(Thumbnail);
  const allMovies = await getMovies(searchString);
  const allMoviesHtml = allMovies.map(Thumbnail);

  const templateHtml =
    (await readFile(join(import.meta.dirname!, "../static/gallery.html")))
      .toString();
  const renderedHtml = templateHtml
    .replace(
      "<!-- SLOT-GALLERY-SEARCH -->",
      searchString,
    )
    .replace(
      "<!-- SLOT-GALLERY-FAVORITES -->",
      render(<>{favoriteMoviesHtml}</>),
    )
    .replace(
      "<!-- SLOT-GALLERY-MOVIES -->",
      render(<>{allMoviesHtml}</>),
    );
  response.send(renderedHtml);
}
