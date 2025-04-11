import { ObjectId } from "mongodb";
import { likeCollection, movieCollection } from "../mongodb.js";
import { readFile } from 'node:fs/promises';
import { join } from "node:path";

function generateVideoHtml(movie) {
    return `<div _id="video_player">
            <h1>${movie?.title}<\h1>
            <video controls="" width="250">
                <source src="${movie?.videoPath}" type="video/mp4">
            </video>
        </div>`
}

export async function playerHandler(request, response) {
    if(request.session.userId == null){
        response.redirect("/login.html", 401)
        return
    }
    
    const movieId = request.query.movie;
    console.log("Before getting movie from db")
    const movie = await movieCollection.findOne(
        {_id: new ObjectId(movieId)}
    )

    const likes = await likeCollection.findOne(
        { movieId: new ObjectId(movieId) }
    )

    const videoHtml = generateVideoHtml(movie)

    const likesHtml = generateLikesHtml()

    const templatePlayerHtml = await readFile(join(
        import.meta.dirname, "../static/player.html")
    )
    
    const playerRenderedHtml = templatePlayerHtml.toString().replace(
        "<!--Video Player Slot-->", videoHtml)
    console.log("Before the send wah")
    response.send(playerRenderedHtml).end()
}
