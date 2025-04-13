import { Movie } from "../../types.ts";
import Thumbnail from "../Thumbnail.tsx";

export default function GalleryPage(
  { favorites, movies, search }: {
    favorites: Movie[];
    movies: Movie[];
    search?: string;
  },
) {
  return (
    <>
      <h1 id="gallery-header">Gallery</h1>
      <form method="get">
        <fieldset id="search-form">
          <legend>Search</legend>
          <label for="search">Query</label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter your search string..."
            value={search}
          />
          <input type="submit" />
        </fieldset>
      </form>
      <h2>Your Favorites</h2>
      <section class="gallery-list">
        {favorites.map((m) => <Thumbnail key={m._id} movie={m} />)}
      </section>
      <h2>All Movies</h2>
      <section class="gallery-list">
        {movies.map((m) => <Thumbnail key={m._id} movie={m} />)}
      </section>
    </>
  );
}
