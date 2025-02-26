import { MongoClient } from "mongodb";

export const client = new MongoClient("mongodb://localhost:27017")
export const db = client.db("video-platform")
export const userCollection = db.collection("users")
