/**
 * Adds sample data to the database to ease the development process.
 */

import hashPassword from "../hashPassword.js";
import { client, db, movieCollection } from "../mongodb.js";

await db.dropCollection("users");
await db.dropCollection("movies");
await db.dropCollection("likes");
const userCollection = await db.createCollection("users");
await userCollection.insertOne({
    username: "email@example.com",
    password: hashPassword("ABCabc1!")
});


await movieCollection.insertMany([
    {
        title: "Ducky",
        genre: "Birds",
        videoPath: "/src/static/data/265501_tiny.mp4",
        thumbnailPath: "/src/static/data/265501_tiny_thumb.png"
    }, {
        title: "Waves",
        genre: "Water",
        videoPath: "/src/static/data/244839_tiny.mp4",
        thumbnailPath: "/src/static/data/244839_tiny_thumb.png"
    }, {
        title: "Waterfall",
        genre: "Water",
        videoPath: "/src/static/data/246856_tiny_.mp4",
        thumbnailPath: "/src/static/data/246856_tiny_thumb.png"
    },
]);

await client.close();
