/**
 * Implementation of application routing, handling, and
 * authentication.
 */

import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import * as path from "node:path";
import { client as mongoClient } from "./mongodb.js";
import { loginPost } from "./pages/login.js";
import { playerHandler } from "./pages/player.js";
import { registerPost } from "./pages/login.js";
import { renderGallery } from "./pages/gallery.js";

const app = express();
app.use(session({
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    resave: true,
    saveUninitialized: true,
    // TODO: we need a better secret i guess.
    secret: "weh",
    store: new MongoStore({ client: mongoClient, dbName: "video-platform" })
}));
app.use(express.urlencoded({ extended: true }));

app.post("/login.html", loginPost);
app.post("/register.html", registerPost);
app.get("/gallery.html", renderGallery);

app.get("/player.html", playerHandler);

app.get("/whoami", (request, response) => {
    response.send(request.session).end();
});

app.use(express.static(path.join(import.meta.dirname, "static")));

const listener = app.listen(3000, () => {
    const { port } = listener.address();
    console.log(`Listening on http://localhost:${port}/`);
});
