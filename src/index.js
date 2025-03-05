import express from "express";
import * as path from "node:path";
import { userCollection } from "./mongodb.js";
import hashPassword from "./hashPassword.js";
import validatePassword from "./validatePassword.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "static")));

app.post("/login.html", async (request, response) => {
    const { username, password } = request.body;

    if (!validatePassword(password)) {
        response.status(400).send("Password does not match complexity requirements.").end();
        return;
    }

    const user = await userCollection.findOne({ username });
    if (user === null) {
        response.status(401).send("User does not exist").end();
        return;
    } else if (user.password !== hashPassword(password)) {
        // Check if login > 3
        console.log(user)
        if ((user.failedLoginAttempts ?? 0) >= 2) {
            await userCollection.deleteOne({ username });
            response.status(401).send("Yippie! Three failed attempts, account deleted! :)").end();
        } else {
            await userCollection.updateOne({ username }, { $inc: { failedLoginAttempts: 1 }})
            response.status(401).send("Incorrect password").end();
        }
        return;
    }
    // On successfull login, redirect to the gallery
    await userCollection.updateOne({username}, { $set: {failedLoginAttempts: 0 }})
    response.redirect(302, "/gallery.html"); // Temporary redirect
});

const listener = app.listen(3000, () => {
    const { port } = listener.address();
    console.log(`Listening on http://localhost:${port}/`);
});
