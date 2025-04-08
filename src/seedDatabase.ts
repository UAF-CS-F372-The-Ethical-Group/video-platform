/**
 * Adds sample data to the database to ease the development process.
 */

import hashPassword from "./hashPassword.ts";
import { client, db } from "./mongodb.ts";

await db.dropCollection("users");
const userCollection = await db.createCollection("users");
await userCollection.insertOne({
  username: "email@example.com",
  password: hashPassword("ABCabc1!"),
});

await client.close();
