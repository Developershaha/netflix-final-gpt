import React from "react";
import { BACKGROUND_IMAGE } from "../utils/constants";

function BackGroundImage() {
  return (
    <div className="fixed -z-10">
      <img
        className="h-screen object-cover"
        src={BACKGROUND_IMAGE}
        alt="background-img"
      />
    </div>
  );
}

export default BackGroundImage;
