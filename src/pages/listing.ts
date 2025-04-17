/**
 * Contains logic for the backoffice listing pages, such as commenting
 * on movies and viewing like counts.
 */

import { Request, Response } from "express";
import Listing, {
  LikeMap,
} from "../components/listing/ListingPage.tsx";
import { renderPage } from "../htmlRenderer.ts";
import {
  getMovies,
  likeCollection,
  movieCollection,
  userCollection,
} from "../mongodb.ts";
import { ObjectId } from "mongodb";
import { User, UserRole } from "../types.ts";

/**
 * Render the listing with all movies after a permissions check.
 */
export async function getListing(
  request: Request,
  response: Response,
) {
  const user = await userCollection.findOne<User>({
    _id: new ObjectId(request.session.userId),
  });
  if (
    user == null ||
    ![UserRole.MARKETING, UserRole.EDITOR].includes(user?.role!)
  ) {
    response.status(403);
    response.send("Unauthorized");
    response.redirect("/login.html");
    return;
  }

  const movies = await getMovies();

  const groupedLikesCursor = likeCollection.aggregate<
    {
      _id: { movieId: ObjectId; status: boolean };
      count: number;
    }
  >([
    {
      $group: {
        _id: { movieId: "$movieId", status: "$status" },
        count: { $sum: 1 },
      },
    },
  ]);

  const groupedLikes = await groupedLikesCursor.toArray();

  // Reduce the grouped likes to a map of id -> likes and dislikes
  const likeMap = groupedLikes.reduce((map, curr) => {
    const movieId = curr._id.movieId.toString();

    // Set default values
    if (!map.has(movieId)) {
      map.set(movieId, { likes: 0, dislikes: 0 });
    }

    // Objects in JS/TS are passed by reference, so using .get in this
    // way returns a reference to the like/dislike object in the map.
    // This allows us to update a single key in the object while other
    // keys' values are preserved.
    const likeValues = map.get(movieId)!;
    // Set the value of likes/dislikes count according to the status
    // of this aggregation.
    likeValues[curr._id.status ? "likes" : "dislikes"] = curr.count;

    return map;
  }, new Map() as LikeMap);

  response.setHeader("content-type", "text/html");
  response.send(
    renderPage(Listing({ movies, likeMap, currentRole: user.role })),
  );
}

/**
 * Handle POSTs to the listing page, and check permissions accordingly
 */
export async function listingPost(
  request: Request,
  response: Response,
) {
  const user = await userCollection.findOne<User>({
    _id: new ObjectId(request.session.userId),
  });
  if (user?.role != UserRole.MARKETING) {
    response.status(403);
    response.send("Unauthorized");
    response.redirect("/login.html");
    return;
  }

  const { movie: movieId, comment } = request.body as Record<
    string,
    string
  >;
  movieCollection.updateOne({
    _id: new ObjectId(movieId),
  }, { $set: { comment } });
  response.redirect("/listing.html");
}
