import { useDispatch, useSelector } from "react-redux";
import { API_OPTION } from "../utils/constants";
import { useEffect } from "react";
import { addPopularMovie } from "../utils/moviesSlice";

const useMoviePopular = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const getPopularMovie = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTION
    );
    const json = await data?.json();
    dispatch(addPopularMovie(json?.results));
  };

  useEffect(() => {
    !popularMovies && getPopularMovie();
  }, []);
};

export default useMoviePopular;
