/**
 * Script to change users password in the database, takes arguments
 * from the command line
 */

import { client, userCollection } from "./mongodb.js";
import hashPassword from "./hashPassword.js";

if (process.argv.length !== 4) {
    console.error(
        "Invalid arguments:\n" +
        "Usage: npm run change-password <username> <password>"
    );
    process.exit(1);
}

const username = process.argv[2];
const password = process.argv[3];
await userCollection.updateOne(
    { username },
    { $set: { password: hashPassword(password) } }
);
const user = await userCollection.findOne({ username });
console.log(user);
client.close();
