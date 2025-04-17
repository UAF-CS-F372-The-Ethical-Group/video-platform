/**
 * Contains functions that process user login and registration
 * for authentication.
 */

import { Request, Response } from "express";
import hashPassword from "../hashPassword.ts";
import { userCollection } from "../mongodb.ts";
import { renderPage } from "../htmlRenderer.ts";
import LoginPage from "../components/LoginPage.tsx";
import { User, UserRole } from "../types.ts";

/**
 * Renders the initial login page
 */
export function loginGet(_request: Request, response: Response) {
  response.setHeader("content-type", "text/html");
  response.send(renderPage(LoginPage()));
}

/**
 * Checks user authentication and returns an HTML page
 * with the movie gallery on successful login. User account
 * is deleted after 3 failed login attempts otherwise.
 */
export async function loginPost(request: Request, response: Response) {
  const { username, password } = request.body;

  const user = await userCollection.findOne<User>({ username });
  if (user === null) {
    response.status(401).send("User does not exist.").end();
    return;
  } else if (user.password !== hashPassword(password)) {
    // Check if login > 3
    if ((user.failedLoginAttempts ?? 0) >= 2) {
      await userCollection.deleteOne({ username });
      response
        .status(401)
        .send("Three failed attempts, account deleted! :)")
        .end();
    } else {
      await userCollection.updateOne(
        { username },
        { $inc: { failedLoginAttempts: 1 } },
      );
      response
        .status(401)
        .send("Incorrect password! Please try again.")
        .end();
    }
    return;
  }

  // Reset the login attempts to zero
  await userCollection.updateOne(
    { username },
    { $set: { failedLoginAttempts: 0 } },
  );

  // Update the user session to show that the user is logged in
  request.session.userId = user._id.toString();

  // On successful login, redirect the user to the correct landing
  // page
  if (user.role === UserRole.VIEWER) {
    response.redirect("/gallery.html");
  } else {
    response.redirect("/listing.html");
  }
}
