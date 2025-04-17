/**
 * Implementation of application routing, handling, and
 * authentication.
 */

import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import { AddressInfo } from "node:net";
import * as path from "node:path";
import { client as mongoClient } from "./mongodb.ts";
import { renderGallery } from "./pages/gallery.ts";
import { loginGet, loginPost } from "./pages/login.ts";
import { registerGet, registerPost } from "./pages/register.ts";
import { playerHandler } from "./pages/player.ts";
import { getListing, listingPost } from "./pages/listing.ts";
import { uploadGet, uploadPost } from "./pages/upload.ts";
import { editGet, editPost } from "./pages/edit.ts";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

const app = express();
app.use(session({
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  resave: true,
  saveUninitialized: true,
  // TODO: we need a better secret i guess.
  secret: "weh",
  store: new MongoStore({ client: mongoClient, dbName: "video-platform" }),
}));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, response) => response.redirect("/gallery.html"));

app.get("/login.html", loginGet);
app.post("/login.html", loginPost);
app.get("/register.html", registerGet);
app.post("/register.html", registerPost);
app.get("/gallery.html", renderGallery);
app.get("/player.html", playerHandler);
app.get("/listing.html", getListing);
app.post("/listing.html", listingPost);
app.get("/upload.html", uploadGet);
app.post("/upload.html", uploadPost);
app.get("/edit/:movieId", editGet);
app.post("/edit/:movieId", editPost);

app.get("/whoami", (request, response) => {
  response.setHeader("content-type", "application/json");
  response.send(request.session).end();
});

app.use(express.static(path.join(import.meta.dirname!, "static")));

const listener = app.listen(3000, () => {
  const { port } = listener.address() as AddressInfo;
  console.log(`Listening on http://localhost:${port}/`);
});
