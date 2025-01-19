export const USER_AVATAR =
  "https://avatars.githubusercontent.com/u/133537646?v=4&size=64";
export const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/IN-en-20250106-TRIFECTA-perspective_27b02e7c-f668-4639-9e82-1a5485084b2a_small.jpg";

export const LOGO =
  "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";

export const BACKGROUND_IMAGE =
  "https://assets.nflxext.com/ffe/siteui/vlv3/154a9550-ce07-4e28-819c-63185dd849f8/web/IN-en-20250106-TRIFECTA-perspective_27b02e7c-f668-4639-9e82-1a5485084b2a_small.jpg";

export const SUPPORTED_LANGAUGES = [
  { identifier: "english", name: "english" },
  { identifier: "marathi", name: "marathi" },
];

export const OPENAI_KEY =
  "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";

// export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;
