import { Movies as MoviesTypes } from "../types/movies.type";

interface Props {
  movies: MoviesTypes[];
  idsFavMovie: number[];
  handleAddFavoriteMovie: (id: number) => void;
}

export const NotResultYet = () => {
  return <h2>Not result yet</h2>;
};

export const Movies = ({
  movies,
  idsFavMovie,
  handleAddFavoriteMovie,
}: Props) => {
  return (
    <div className="grid grid-cols-4 gap-5 mt-10">
      {movies.map((movie) => (
        <div key={movie.id} className="flex flex-col gap-5">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div className="flex gap-3">
            <span>{idsFavMovie.includes(movie.id) ? "🌟" : ""}</span>
            <h2>{movie.title}</h2>
          </div>
          <button
            className="p-2 bg-zinc-950"
            onClick={() => handleAddFavoriteMovie(movie.id)}
          >
            {idsFavMovie.includes(movie.id)
              ? "Remove Favorite"
              : "Add Favorite"}
          </button>
        </div>
      ))}
    </div>
  );
};

export const MovieListResult = ({
  movies,
  idsFavMovie,
  handleAddFavoriteMovie,
}: Props) => {
  const result = movies.length;

  return result ? (
    <Movies
      movies={movies}
      idsFavMovie={idsFavMovie}
      handleAddFavoriteMovie={handleAddFavoriteMovie}
    />
  ) : (
    <NotResultYet />
  );
};
