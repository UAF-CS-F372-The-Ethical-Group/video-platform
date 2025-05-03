/**
 *  Holds front end html logic for the video player page in a
 *  modular jsx component
 */

import LikeButtons from "./LikeButtons.tsx";
import VideoPlayer from "./VideoPlayer.tsx";
import { Like, Movie } from "../../types.ts";
import Head from "../Head.tsx";
import { VNode } from "preact";

/**
 * Component that displays the video page, takes the movie and the
 * like data from the data base and then displays that data in the
 * html that is sent to the client.
 *
 * @param movie
 * @param Like
 * @returns
 */
export default function VideoPage(
  { movie, like }: { movie: Movie; like?: Like },
): VNode {
  return (
    <>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <VideoPlayer movie={movie} />
      <LikeButtons movie={movie} like={like} />
    </>
  );
}
