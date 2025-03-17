import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./appSlide";

export default configureStore({
  reducer: {
    counter: appSlice,
  },
});
