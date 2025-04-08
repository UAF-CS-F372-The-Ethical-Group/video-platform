/**
 * Implementation of application routing, handling, and
 * authentication.
 */

import express from "express";
import * as path from "node:path";
import { userCollection } from "./mongodb.ts";
import hashPassword from "./hashPassword.ts";
import validatePassword from "./validatePassword.ts";
import { AddressInfo } from "node:net";
import renderHtml from "./htmlRenderer.ts";
import ErrorPage from "./pages/ErrorPage.tsx";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname ?? "", "static")));

app.post("/login.html", async (request, response) => {
  const { username, password } = request.body;

  if (!validatePassword(password)) {
    response
      .status(400)
      .setHeader("content-type", "text/html")
      .send(
        renderHtml(
          ErrorPage({
            error: "Invalid password",
            description: "Password does not meet complexity requirements.",
          }),
        ),
      )
      .end();
    return;
  }

  const user = await userCollection.findOne({ username });
  if (user === null) {
    response.status(401).send("User does not exist").end();
    return;
  } else if (user.password !== hashPassword(password)) {
    // Check if login > 3
    if ((user.failedLoginAttempts ?? 0) >= 2) {
      await userCollection.deleteOne({ username });
      response
        .status(401)
        .setHeader("content-type", "text/html")
        .send(
          renderHtml(
            ErrorPage({
              error: "Failed login attempt",
              description: "Three failed login attempts, account deleted! :3",
            }),
          ),
        )
        .end();
    } else {
      await userCollection.updateOne(
        { username },
        { $inc: { failedLoginAttempts: 1 } },
      );
      response.status(401).send("Incorrect password").end();
    }
    return;
  }
  // On successfull login, redirect to the gallery
  await userCollection.updateOne(
    { username },
    { $set: { failedLoginAttempts: 0 } },
  );
  response.redirect(302, "/gallery.html"); // Temporary redirect
});

const listener = app.listen(3000, () => {
  const { port } = listener.address() as AddressInfo;
  console.log(`Listening on http://localhost:${port}/`);
});
