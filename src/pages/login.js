/**
 * Contains functions that process user login and registration
 * for authentication.
 */

import hashPassword from "../hashPassword.js";
import { userCollection } from "../mongodb.js";
import validatePassword from "../validatePassword.js";

/**
 * Checks user authentication and returns an HTML page
 * with the movie gallery on successful login. User account
 * is deleted after 3 failed login attempts otherwise.
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
export async function loginPost(request, response) {
    const { username, password } = request.body;

    const user = await userCollection.findOne({ username });
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
                { $inc: { failedLoginAttempts: 1 } }
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
        { $set: { failedLoginAttempts: 0 } }
    );

    // Update the user session to show that the user is logged in
    request.session.userId = user._id;

    // On successful login, redirect to the gallery
    response.redirect(302, "/gallery.html"); // Temporary redirect
}

/**
 * Processes registration of new user accounts and seeds the data 
 * in the database.
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
export async function registerPost (request, response) {
    const { username, password , confirmPassword } = request.body;

    const user = await userCollection.findOne({username});
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

    if(password !== confirmPassword) {
        response
            .status(400)
            .send("Passwords do not match! Please try again.")
            .end();
        return;
    }

    await userCollection.insertOne({
        username: username,
        password: hashPassword(password),
        role: "viewer"
    });

    response.status(200).send("User registered successfully!").end();
}