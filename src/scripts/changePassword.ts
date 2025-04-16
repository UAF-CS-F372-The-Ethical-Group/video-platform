/**
 * Script to change users password in the database, takes arguments
 * from the command line
 */

import { client, userCollection } from "../mongodb.ts";
import hashPassword from "../hashPassword.ts";

if (Deno.args.length !== 2) {
  console.error(
    "Invalid arguments:\n" +
      "Usage: npm run change-password <username> <password>",
  );
  Deno.exit(1);
}

const [username, password] = Deno.args;
await userCollection.updateOne(
  { username },
  { $set: { password: hashPassword(password) } },
);
const user = await userCollection.findOne({ username });
console.log(user);
client.close();
