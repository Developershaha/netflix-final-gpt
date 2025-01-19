import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./userSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";

import moviesReduser from "./moviesSlice";
const appStore = configureStore({
  reducer: {
    user: userReduser,
    movies: moviesReduser,
    gpt: gptReducer,
    config: configReducer,
  },
});

export default appStore;
