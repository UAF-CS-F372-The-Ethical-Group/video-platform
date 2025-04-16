/**
 * Exports variables that allow easier access to MongoDB and data in
 * the database.
 */

import { MongoClient } from "mongodb";
import { Like, Movie, User } from "./types.ts";

export const client = new MongoClient("mongodb://localhost:27017");
export const db = client.db("video-platform");
export const userCollection = db.collection<User>("users");
export const movieCollection = db.collection<Movie>("movies");
export const likeCollection = db.collection<Like>("likes");
