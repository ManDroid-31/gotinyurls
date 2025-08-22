import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.jsx";
import urlsReducer from "./urlsSlice.jsx";

const store = configureStore({
  reducer: {
    user: userReducer,
    urls: urlsReducer,
  },
});

export default store;
