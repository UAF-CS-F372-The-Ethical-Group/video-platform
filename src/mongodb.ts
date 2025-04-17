/**
 * Exports variables that allow easier access to MongoDB and data in
 * the database.
 */

import { Document, MongoClient } from "mongodb";
import { Movie } from "./types.ts";

export const client = new MongoClient(
  Deno.env.get("MONGODB_URI") ?? "mongodb://localhost:27017",
);
export const db = client.db("video-platform");
export const userCollection = db.collection("users");
export const movieCollection = db.collection("movies");
export const likeCollection = db.collection("likes");

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
