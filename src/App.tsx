import { useState } from "react";
import { Movies } from "./types/movies.type";
import { getMovies } from "./service/getMovies";
import { MovieListResult } from "./components/Movies";

function App() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [idsFavMovie, setIdsFavMovie] = useState<number[]>(() => {
    const data = localStorage.getItem("favMovies")
    if (data) {
      return JSON.parse(data)
    }else{
      return []
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(() => true);

    try {
      const form = new FormData(e.currentTarget);
      const data = form.get("search");

      if (data !== null) {
        const result = await getMovies(data?.toString());

        setMovies(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(() => false);
    }
  };

  const handleAddFavoriteMovie = (id: number) => {
    const findMovie = idsFavMovie.find((idMovie) => idMovie === id);

    if (findMovie) {
      const filter = idsFavMovie.filter((idMovie) => idMovie !== id);
      setIdsFavMovie(filter);
      localStorage.setItem("favMovies", JSON.stringify(filter));
      return;
    }

    localStorage.setItem("favMovies", JSON.stringify([...idsFavMovie, id]));
    setIdsFavMovie((data) => [...data, id]);
  };

  return (
    <div className="container mx-auto">
      <h2 className="font-bold text-center my-10">Challengue tecnico</h2>

      <form className="flex justify-center gap-5" onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          className="rounded-3xl p-2"
          style={{ width: "340px" }}
          placeholder="busque la pelicula"
        />
        <button type="submit" className="p-4 bg-slate-950">
          Enviar
        </button>
      </form>

      {loading ? (
        <h2>Cargando...</h2>
      ) : (
        <MovieListResult
          movies={movies}
          idsFavMovie={idsFavMovie}
          handleAddFavoriteMovie={handleAddFavoriteMovie}
        />
      )}
    </div>
  );
}

export default App;
