import express from "express";
import * as path from "node:path";
import { userCollection } from "./mongodb.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "static")));

app.post("/login.html", async (request, response) => {
    const { username, password } = request.body;

    const user = await userCollection.findOne({ username });
    if (user === null) {
        response.status(401).send("User does not exist").end();
        return;
    } else if (user.password !== password) {
        response.status(401).send("Incorrect password").end();
        return;
    }
    // On successfull login, redirect to the gallery
    response.redirect(302, "/gallery.html"); // Temporary redirect
});

const listener = app.listen(3000, () => {
    const { port } = listener.address();
    console.log(`Listening on http://localhost:${port}/`);
});