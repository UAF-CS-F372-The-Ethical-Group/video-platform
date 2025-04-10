import hashPassword from "../hashPassword.js";
import { userCollection } from "../mongodb.js";
import validatePassword from "../validatePassword.js";

export async function loginPost(request, response) {
    const { username, password } = request.body;

    if (!validatePassword(password)) {
        response
            .status(400)
            .send("Password does not match complexity requirements.")
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
                .send("Three failed attempts, account deleted! :)")
                .end();
        } else {
            await userCollection.updateOne(
                { username },
                { $inc: { failedLoginAttempts: 1 } }
            );
            response.status(401).send("Incorrect password").end();
        }
        return;
    }

    // Reset the login attempts to zero
    await userCollection.updateOne(
        { username },
        { $set: { failedLoginAttempts: 0 } }
    );

    // Update the user session to show that the user is logged in
    request.session.user = user._id;

    // On successfull login, redirect to the gallery
    response.redirect(302, "/gallery.html"); // Temporary redirect
}
