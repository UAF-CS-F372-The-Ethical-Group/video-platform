import LikeButtons from "./LikeButtons.tsx";
import VideoPlayer from "./VideoPlayer.tsx";
import { Like, Movie } from "../../types.ts";

export default function VideoPage(
  { movie, like }: { movie: Movie; like?: Like },
) {
  return (
    <>
      <VideoPlayer movie={movie} />
      <LikeButtons movie={movie} like={like} />
    </>
  );
}
