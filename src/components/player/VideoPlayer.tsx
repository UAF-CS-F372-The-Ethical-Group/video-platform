/**
 * JSX component that handles displaying the movie to the user
 */

import { VNode } from "preact";
import { Movie } from "../../types.ts";

/**
 *  Modularized video player component that injects the given movie
 * data into the html in the form of the file path, title and video
 * mime type
 *
 * @param movie
 * @returns
 */
export default function VideoPlayer({ movie }: { movie: Movie }): VNode {
  return (
    <div id="video_player">
      <h1>{movie.title}</h1>
      <video controls autoplay width="250">
        <source src={movie.videoPath} type={movie.videoMimeType} />
      </video>
    </div>
  );
}
