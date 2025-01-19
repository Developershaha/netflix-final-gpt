import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "english",
  },
  reducers: {
    chaneLangauge: (state, action) => {
      state.lang = action?.payload;
    },
  },
});

export const { chaneLangauge } = configSlice.actions;
export default configSlice?.reducer;
