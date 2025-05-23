/**
 * Adds sample data to the database to ease the development process.
 */
import { Collection } from "mongodb";
import hashPassword from "../hashPassword.ts";
import {
  client,
  db,
  likeCollection,
  movieCollection,
} from "../mongodb.ts";
import { Like, Movie } from "../types.ts";

if (Deno.args.includes("--no-reseed")) {
  const collections = await db.collections();
  if (collections.length > 0) {
    console.log("Collections exist, not reseeding database.");
    await client.close();
    Deno.exit();
  }
}

await db.dropCollection("users");
await db.dropCollection("movies");
await db.dropCollection("likes");
const userCollection = await db.createCollection("users");

const createdUser = await userCollection.insertOne({
  username: "email@example.com",
  password: hashPassword("ABCabc1!"),
  role: "viewer",
});

// Create a user for each of the roles
const roles = ["viewer", "marketing", "editor"];
for (const role of roles) {
  await userCollection.insertOne({
    username: `${role}@example.com`,
    password: hashPassword("ABCabc1!"),
    role,
  });
}

const createdMovieResponse =
  await (movieCollection as unknown as Collection<Omit<Movie, "_id">>)
    .insertMany([
      {
        title: "Ducky",
        genre: "Birds",
        videoPath: "/data/265501_tiny.mp4",
        videoMimeType: "video/mp4",
        thumbnailPath: "/data/265501_tiny_thumb.png",
      },
      {
        title: "Waves",
        genre: "Water",
        videoPath: "/data/244839_tiny.mp4",
        videoMimeType: "video/mp4",
        thumbnailPath: "/data/244839_tiny_thumb.png",
      },
      {
        title: "Waterfall",
        genre: "Water",
        videoPath: "/data/246856_tiny.mp4",
        videoMimeType: "video/mp4",
        thumbnailPath: "/data/246856_tiny_thumb.png",
      },
    ]);

const createdMovieIds = Object.values(
  createdMovieResponse.insertedIds,
);
// Take half of the created movies, like some, and dislike others
const likes = createdMovieIds.slice(0, createdMovieIds.length / 2 + 1)
  .map((
    movieId,
    idx,
  ) => ({
    movieId,
    userId: createdUser.insertedId,
    status: idx % 2 === 0,
  }));

await (likeCollection as unknown as Collection<Omit<Like, "_id">>)
  .insertMany(
    likes,
  );

await client.close();
console.log("Successfully seeded database.");
