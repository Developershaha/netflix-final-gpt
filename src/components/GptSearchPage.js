import React from "react";
import BackGroundImage from "./BackGroundImage";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";

function GptSearchPage() {
  return (
    <>
      <BackGroundImage />
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
}

export default GptSearchPage;
