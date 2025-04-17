import { Request, Response } from "express";
import { movieCollection, userCollection } from "../mongodb.ts";
import { renderPage } from "../htmlRenderer.ts";
import { ObjectId } from "mongodb";
import { User, UserRole } from "../types.ts";
import UploadPage from "../components/listing/UploadPage.tsx";

export async function uploadGet(
  request: Request,
  response: Response,
) {
  const user = await userCollection.findOne<User>({
    _id: new ObjectId(request.session.userId),
  });
  if (user == null || ![UserRole.EDITOR].includes(user?.role!)) {
    response.status(403);
    response.send("Unauthorized");
    response.redirect("/login.html");
    return;
  }

  response.setHeader("content-type", "text/html");
  response.send(renderPage(UploadPage()));
}

export async function uploadPost(
  request: Request,
  response: Response,
) {
  const { title, genre, filePath, mimeType, thumbnailPath } =
    request.body;

  await movieCollection.insertOne({
    title: title,
    genre: genre,
    videoPath: filePath,
    videoMimeType: mimeType,
    thumbnailPath: thumbnailPath,
  });

  response.redirect("/listing.html");
}
