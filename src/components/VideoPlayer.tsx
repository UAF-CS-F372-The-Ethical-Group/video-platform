import { Movie } from "../types.ts";

export default function VideoPlayer({ movie }: { movie: Movie }) {
  return (
    <div id="video_player">
      <h1>{movie.title}</h1>
      <video controls autoplay width="250">
        <source src={movie.videoPath} type="video/mp4" />
      </video>
    </div>
  );
}
