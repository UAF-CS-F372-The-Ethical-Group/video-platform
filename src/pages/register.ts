import { Request, Response } from "express";
import hashPassword from "../hashPassword.ts";
import { userCollection } from "../mongodb.ts";
import validatePassword from "../validatePassword.ts";
import RegisterPage from "../components/RegisterPage.tsx";
import { renderPage } from "../htmlRenderer.ts";

/**
 * Renders the initial login page
 */
export function registerGet(_request: Request, response: Response) {
  response.setHeader("content-type", "text/html");
  response.send(renderPage(RegisterPage()));
}

/**
 * Processes registration of new user accounts and seeds the data
 * in the database.
 */
export async function registerPost(request: Request, response: Response) {
  const { username, password, confirmPassword } = request.body;

  const user = await userCollection.findOne({ username });
  if (user) {
    response.status(400).send("Username already taken.").end();
    return;
  }

  if (!validatePassword(password)) {
    response
      .status(400)
      .send(`Password does not match complexity requirements.
                <br>
                Password must have:<br>
                - Only 8 characters<br>
                - 1 capital letter<br>
                - 1 lowercase letter<br>
                - 1 number<br>
                - 1 special character: !@#$%^&*()_+.
                `)
      .end();
    return;
  }

  if (password !== confirmPassword) {
    response
      .status(400)
      .send("Passwords do not match! Please try again.")
      .end();
    return;
  }

  await userCollection.insertOne({
    username: username,
    password: hashPassword(password),
    role: "viewer",
  });

  response.status(200).send("User registered successfully!").end();
}
