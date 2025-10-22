import { configureStore } from "@reduxjs/toolkit";
import movraxReducer from "./MovraxSlice";

export const store = configureStore({
  reducer: {
    movraxData: movraxReducer,
  },
});
