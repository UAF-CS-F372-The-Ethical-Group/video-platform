import { Request, Response } from "express";
import Listing from "../components/listing/ListingPage.tsx";
import { renderPage } from "../htmlRenderer.ts";
import { getMovies, movieCollection } from "../mongodb.ts";
import { ObjectId } from "mongodb";

export async function getListing(_request: Request, response: Response) {
  const movies = await getMovies();
  response.send(renderPage(Listing({ movies })));
}

export function listingPost(request: Request, response: Response) {
  const { movie: movieId, comment } = request.body as Record<string, string>;
  movieCollection.updateOne({
    _id: new ObjectId(movieId),
  }, { $set: { comment } });
  response.redirect("/listing.html");
}
