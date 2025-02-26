// Adds filler data to the database to ease the development process.

import { client, db } from "./mongodb.js";

await db.dropCollection("users")
const userCollection = await db.createCollection("users")
await userCollection.insertOne({
    username: "email@example.com",
    password: "password"
})

await client.close()