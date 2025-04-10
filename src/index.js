/**
 * Implementation of application routing, handling, and
 * authentication.
 */

import express from "express";
import * as path from "node:path";
import { loginPost } from "./pages/login.js";
import session from "express-session";

const app = express();
app.use(session({
    maxAge: 24 * 60 * 60 * 1000,// 24 hours
    resave: true,
    saveUninitialized: true,
    // TODO: we need a better secret i guess.
    secret: "weh"
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "static")));

app.post("/login.html", loginPost);

app.get("/whoami", (request, response) => {
    response.send(request.session).end();
});

const listener = app.listen(3000, () => {
    const { port } = listener.address();
    console.log(`Listening on http://localhost:${port}/`);
});
