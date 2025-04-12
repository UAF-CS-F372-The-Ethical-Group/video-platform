/**
 * Exports variables that allow easier access to MongoDB and data in
 * the database.
 */

import { MongoClient } from "mongodb";

export const client = new MongoClient("mongodb://localhost:27017");
export const db = client.db("video-platform");
export const userCollection = db.collection("users");
export const movieCollection = db.collection("movies")
export const likeCollection = db.collection("likes")
