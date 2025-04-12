/**
 * Script to change user's role in the database, takes arguments from
 * the command line.
 */

import { client, userCollection } from "../mongodb.ts";

if (process.argv.length !== 4) {
  console.error(
    "Invalid arguments:\n" +
      "Usage: npm run change-role <username> <role>",
  );
  process.exit(1);
}

const username = process.argv[2];
const role = process.argv[3];
await userCollection.updateOne(
  { username },
  { $set: { role: role } },
);
const user = await userCollection.findOne({ username });
console.log(user);
client.close();
