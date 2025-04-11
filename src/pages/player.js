import { ObjectId } from "mongodb";
import { likeCollection, movieCollection } from "../mongodb.js";
import { readFile } from 'node:fs/promises';
import { join } from "node:path";

function generateVideoHtml(movie) {
    return `<div _id="video_player">
            <h1>${movie?.title}<\h1>
            <video controls="" autoplay="" width="250">
                <source src="${movie?.videoPath}" type="video/mp4">
            </video>
        </div>`
}

function generateLikesHtml(movie) {
    return `<div>
        <form>
        <input type="hidden" name="movie" value="${movie?._id}">
        <input type="hidden" name="action" value="like">
        <input type="submit" id="likeButton" value="Like">
        </form>
        <form>
        <input type="hidden" name="movie" value="${movie?._id}">
        <input type="hidden" name="action" value="dislike">
        <input type="submit" id="dislikeButton" value="Dislike">
        </form>
    </div>`
}

export async function playerHandler(request, response) {
    if(request.session.userId == null){
        response.redirect("/login.html", 401)
        return
    }
    const movieId = request.query.movie;
    const movie = await movieCollection.findOne(
        {_id: new ObjectId(movieId)}
    )
    if(movie == null){
        response.redirect("/gallery.html")
        return
    }
    const actionValue = request.query.action
    if(actionValue !== null) {
            await likeCollection.updateOne(
                { 
                    movieId: new ObjectId(movieId),
                    userId: new ObjectId(request.session.userId) 
                },
                { $set: { status: actionValue==="like" } },
                {upsert: true}
            );
    }

    const likes = await likeCollection.findOne(
        { movieId: new ObjectId(movieId) }
    )

    const videoHtml = generateVideoHtml(movie)

    const likesHtml = generateLikesHtml(movie)

    const templatePlayerHtml = await readFile(join(
        import.meta.dirname, "../static/player.html")
    )
    
    const playerRenderedHtml = templatePlayerHtml.toString().replace(
        "<!--Video Player Slot-->", videoHtml).replace(
        "<!--Video Likes Slot-->", likesHtml)
    response.send(playerRenderedHtml).end()
}
