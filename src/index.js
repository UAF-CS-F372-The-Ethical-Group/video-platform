/**
 * Implementation of application routing, handling, and
 * authentication.
 */

import express from "express";
import * as path from "node:path";
import { loginPost } from "./pages/login.js";
import { registerPost } from "./pages/login.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "static")));

app.post("/login.html", loginPost);
app.post("/register.html", registerPost);

const listener = app.listen(3000, () => {
    const { port } = listener.address();
    console.log(`Listening on http://localhost:${port}/`);
});
