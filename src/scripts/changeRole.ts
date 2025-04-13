/**
 * Script to change user's role in the database, takes arguments from
 * the command line.
 */

import { client, userCollection } from "../mongodb.ts";

console.log(Deno.args);
if (Deno.args.length !== 2) {
  console.error(
    "Invalid arguments:\n" +
      "Usage: npm run change-role <username> <role>",
  );
  Deno.exit(1);
}
const [username, role] = Deno.args;
await userCollection.updateOne(
  { username },
  { $set: { role: role } },
);
const user = await userCollection.findOne({ username });
console.log(user);
client.close();
