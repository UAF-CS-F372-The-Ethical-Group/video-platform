import LikeButtons from "./LikeButtons.tsx";
import VideoPlayer from "./VideoPlayer.tsx";
import { Like, Movie } from "../../types.ts";
import Head from "../Head.tsx";

export default function VideoPage(
  { movie, like }: { movie: Movie; like?: Like },
) {
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
