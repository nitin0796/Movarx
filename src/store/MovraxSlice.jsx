import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  banner: [],
  imageUrl: "",
};

export const movraxSlice = createSlice({
  name: "movrax",
  initialState,
  reducers: {
    setBannerReducer: (state, { payload }) => {
      state.banner = payload;
    },
    setImageURLReducer: (state, { payload }) => {
      state.imageUrl = payload;
    },
  },
});

export const { setBannerReducer, setImageURLReducer } = movraxSlice.actions;

export default movraxSlice.reducer;
