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
 * @returns {Promise<Array<Movie>>}
 */
async function getFavorites(userId) {
    const movieLikesCursor = likeCollection.aggregate([
        {
            $match: {
                userId: userId,
                status: true
            }
        },
        { $sort: { title: 1 } },
        {
            $lookup: {
                from: "movies",
                localField: "movieId",
                foreignField: "_id",
                as: "movieDocument"
            }
        }
    ]);
    const movieLikes = await movieLikesCursor.toArray();
    return movieLikes.map(like => like.movieDocument).flat();
}

/**
 * Fetch all movies, sorted alphabetically
 * @returns {Promise<Array<Movie>>}
 */
async function getMovies() {
    const cursor = await movieCollection.aggregate([{ $sort: { title: 1 } }]);
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

    const favoriteMovies = await getFavorites(user._id);
    const favoriteMoviesHtml = favoriteMovies.map(generateThumbnailHtml).join("");
    const allMovies = await getMovies();
    const allMoviesHtml = allMovies.map(generateThumbnailHtml).join("");

    const templateHtml = (await readFile(join(import.meta.dirname, "../static/gallery.html"))).toString();
    const renderedHtml = templateHtml
        .replace("<!-- SLOT-GALLERY-FAVORITES -->", favoriteMoviesHtml)
        .replace("<!-- SLOT-GALLERY-MOVIES -->", allMoviesHtml);
    response.send(renderedHtml);
};
