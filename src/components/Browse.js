import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useMoviePopular from "../hooks/useMoviePopular";
import { useSelector } from "react-redux";
import GptSearchPage from "./GptSearchPage";

const Browse = () => {
  const showGPtSearch = useSelector((store) => store.gpt.showGptSearch);
  useNowPlayingMovies();
  useMoviePopular();
  return (
    <div>
      <Header />

      {showGPtSearch ? (
        <GptSearchPage />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
