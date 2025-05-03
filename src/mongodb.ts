/**
 * Exports variables that allow easier access to MongoDB and data in
 * the database.
 */

import { Collection, Db, Document, MongoClient } from "mongodb";
import { Movie } from "./types.ts";

/** MongoDB client used to connect to MongoDB */
export const client: MongoClient = new MongoClient(
  Deno.env.get("MONGODB_URI") ?? "mongodb://localhost:27017",
);
/** MongoDB database for all collections */
export const db: Db = client.db("video-platform");
/** MongoDB collection for users */
export const userCollection: Collection = db.collection("users");
/** MongoDB collection for movies */
export const movieCollection: Collection = db.collection("movies");
/** MongoDB collection for likes */
export const likeCollection: Collection = db.collection("likes");

/**
 * Fetch all movies, sorted alphabetically
 */
export async function getMovies(
  filter: string = "",
): Promise<Movie[]> {
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
