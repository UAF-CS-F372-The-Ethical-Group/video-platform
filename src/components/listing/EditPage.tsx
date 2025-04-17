/**
 *  Defines components and markup for the edit video page.
 */
import { Movie } from "../../types.ts";
import Head from "../Head.tsx";

/**
 *  Generates the base layout for the edit page.
 */
export default function EditPage({ movie }: { movie: Movie }) {
  return (
    <>
      <Head>
        <title>Edit Video</title>
      </Head>
      <h1 id="edit-header">Edit Video</h1>
      <form
        id="edit-form"
        action={`/edit/${movie._id}`}
        method="post"
      >
        <label id="title-label">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={movie.title}
          required
        />
        <br />
        <label id="genre-label">Genre:</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={movie.genre}
          required
        />
        <br />
        <label id="file-path-label">File Path:</label>
        <input
          type="text"
          id="file-path"
          name="filePath"
          value={movie.videoPath}
          required
        />
        <br />
        <label id="mime-type-label">Video Mime Type:</label>
        <input
          type="text"
          id="mime-type"
          name="mimeType"
          value={movie.videoMimeType}
          required
        />
        <br />
        <label id="thumbnail-path-label">Thumbnail Path:</label>
        <input
          type="text"
          id="thumbnail-path"
          name="thumbnailPath"
          value={movie.thumbnailPath}
          required
        />
        <br />
        <input
          id="submit"
          type="submit"
          name="action"
          value="Delete"
        />
        <input
          id="submit"
          type="submit"
          name="action"
          value="Save Changes"
        />
      </form>
    </>
  );
}
