import React, { useRef } from "react";
import langaugeTranslation from "../translation/searchGptTranslation";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai.js";
import { API_OPTION, OPENAI_KEY } from "../utils/constants.js";
import { addGptMovieResult } from "../utils/gptSlice.js";

function GptSearchBar() {
  const langaugeKey = useSelector((store) => store?.config?.lang);
  const SearchText = useRef(null);
  const dispatch = useDispatch();

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTION
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log("first", OPENAI_KEY);
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      SearchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-4o-mini",
    });
    if (!gptResults.choices) {
      // TODO: Write Error Handling
    }
    console.log(gptResults.choices?.[0]?.message?.content);
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    // For each movie I will search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    //return tmdb api promises [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-1/2 rounded-lg bg-black grid grid-cols-12"
        onSubmit={(e) => {
          e?.preventDefault();
        }}
      >
        <input
          ref={SearchText}
          className="p-4 m-4 col-span-9 rounded-lg"
          type="text "
          placeholder={langaugeTranslation?.[langaugeKey]?.gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {langaugeTranslation?.[langaugeKey]?.search}
        </button>
      </form>
    </div>
  );
}

export default GptSearchBar;
