/**
 * Adds sample data to the database to ease the development process.
 */

import hashPassword from "../hashPassword.js";
import { client, db, likeCollection, movieCollection } from "../mongodb.js";

await db.dropCollection("users");
await db.dropCollection("movies");
await db.dropCollection("likes");
const userCollection = await db.createCollection("users");

const createdUser = await userCollection.insertOne({
    username: "email@example.com",
    password: hashPassword("ABCabc1!")
});

const createdMovieResponse = await movieCollection.insertMany([
    {
        title: "Ducky",
        genre: "Birds",
        videoPath: "/data/265501_tiny.mp4",
        thumbnailPath: "/data/265501_tiny_thumb.png"
    }, {
        title: "Waves",
        genre: "Water",
        videoPath: "/data/244839_tiny.mp4",
        thumbnailPath: "/data/244839_tiny_thumb.png"
    }, {
        title: "Waterfall",
        genre: "Water",
        videoPath: "/data/246856_tiny_.mp4",
        thumbnailPath: "/data/246856_tiny_thumb.png"
    },
]);

const createdMovieIds = Object.values(createdMovieResponse.insertedIds);
// Take half of the created movies, like some, and dislike others
const likes = createdMovieIds.slice(0, createdMovieIds.length / 2 + 1).map((movieId, idx) => ({
    movieId,
    userId: createdUser.insertedId,
    status: idx % 2 === 0
}));

await likeCollection.insertMany(likes);

await client.close();
