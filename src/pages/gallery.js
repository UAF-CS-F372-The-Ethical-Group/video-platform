import { ObjectId } from "mongodb";
import { readFile } from "node:fs/promises";

import { likeCollection, movieCollection, userCollection } from "../mongodb.js";
import { join } from "node:path";

/**
 * @typedef {Object} Movie
 * @property {string} title
 * @property {string} genre
 * @property {string} thumbnailPath
 * @property {string} videoPath
 * @property {string} _id
 */


/**
 * Fetch the favorite movies for the specified user
 * @param {ObjectId} userId
 * @param {string} filter The string to filter movies by
 * @returns {Promise<Array<Movie>>}
 */
async function getFavorites(userId, filter) {
    const pipeline = [
        {
            $match: {
                userId: userId,
                status: true
            }
        },
        {
            $lookup: {
                from: "movies",
                localField: "movieId",
                foreignField: "_id",
                as: "movieDocument"
            }
        },
        { $sort: { "movieDocument.title": 1 } },
    ];
    if (filter) {
        pipeline.push({
            $match: {
                "movieDocument.title": {
                    $regex: filter,
                    $options: "i"
                }
            }
        });
    }
    const movieLikesCursor = likeCollection.aggregate(pipeline);
    const movieLikes = await movieLikesCursor.toArray();
    return movieLikes.map(like => like.movieDocument).flat();
}

/**
 * Fetch all movies, sorted alphabetically
 * @param {string} filter The string to filter movies by
 * @returns {Promise<Array<Movie>>}
 */
async function getMovies(filter) {
    const pipeline = [{ $sort: { title: 1 } }];
    if (filter) {
        pipeline.unshift({
            $match: {
                title: {
                    $regex: filter,
                    $options: "i"
                }
            }
        });
    }
    const cursor = await movieCollection.aggregate(pipeline);
    return await cursor.toArray();
}

/**
 * Generates HTML markup for the given movie
 * @param {Movie} movie 
 * @returns 
 */
function generateThumbnailHtml(movie) {
    return `
        <div class="movie">
            <a href="/player.html?movie=${movie._id}">
                <img src="${movie.thumbnailPath}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            </a>
        </div> 
    `;
}

/**
 * Checks user authentication and then returns an HTML page with the
 * user's favorite movies, and a list of all movies. They are sorted
 * alphabetically, and filtered according to the `search` query
 * parameter.
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
export async function renderGallery(request, response) {
    const user = await userCollection.findOne({ _id: new ObjectId(request.session.userId) });
    if (user == null) {
        response.redirect("/login.html");
        return;
    }

    const searchString = request.query.search ?? "";

    const favoriteMovies = await getFavorites(user._id, searchString);
    const favoriteMoviesHtml = favoriteMovies.map(generateThumbnailHtml).join("");
    const allMovies = await getMovies(searchString);
    const allMoviesHtml = allMovies.map(generateThumbnailHtml).join("");

    const templateHtml = (await readFile(join(import.meta.dirname, "../static/gallery.html"))).toString();
    const renderedHtml = templateHtml
        .replace("<!-- SLOT-GALLERY-SEARCH -->", searchString)
        .replace("<!-- SLOT-GALLERY-FAVORITES -->", favoriteMoviesHtml)
        .replace("<!-- SLOT-GALLERY-MOVIES -->", allMoviesHtml);
    response.send(renderedHtml);
};
