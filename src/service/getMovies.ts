import { Movies } from "../types/movies.type";

export const getMovies = async (search: string) => {
  const path = 'https://api.themoviedb.org/3/search/movie'
  const key = "733b7f2dfae5b323c1e4852ece8c9fca";
  const limit = 10
  const url = `${path}?api_key=${key}&query=${search}&include_adult=false&limit=${limit}';
  `;
  try {
    const res = await fetch(url);
    const data = await res.json();

    return data.results.map((movie: Movies) => {
      return {
        id: movie.id,
        title: movie.title,
        genre_ids: movie.genre_ids,
        poster_path: movie.poster_path,
      };
    });
  } catch (error) {
    console.log(error);
  }
};
