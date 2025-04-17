/**
 *  Defines components and markup for the video upload page.
 */
import Head from "../Head.tsx";

/**
 *  Generates base layout for the upload page.
 */
export default function UploadPage() {
  return (
    <>
      <Head>
        <title>Upload New Video</title>
      </Head>
      <h1 id="upload-header">Upload New Video</h1>
      <form id="upload-form" action="/upload.html" method="post">
        <label id="title-label">Title:</label>
        <input type="text" id="title" name="title" required />
        <br />
        <label id="genre-label">Genre:</label>
        <input type="text" id="genre" name="genre" required />
        <br />
        <label id="mime-type-label">Video Mime Type:</label>
        <input
          type="text"
          id="mime-type"
          name="mimeType"
          required
        />
        <br />
        <label id="file-path-label">Video File Path:</label>
        <input
          type="text"
          id="file-path"
          name="filePath"
          placeholder="/data/yourvideo.mp4"
          required
        />
        <br />
        <label id="thumbnail-path-label">Thumbnail Path:</label>
        <input
          type="text"
          id="thumbnail-path"
          name="thumbnailPath"
          placeholder="/data/yourthumb.png"
          required
        />
        <br />
        <input
          id="submit"
          type="submit"
          name="upload"
          value="Upload"
        />
      </form>
    </>
  );
}
