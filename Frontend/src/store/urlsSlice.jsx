import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  urls: [],
  loading: false,
  error: null,
};

const urlsSlice = createSlice({
  name: "urls",
  initialState,
  reducers: {
    addUrl: (state, action) => {
      state.urls.push(action.payload);
    },

    removeUrl: (state, action) => {
      state.urls = state.urls.filter((url) => url._id !== action.payload);
    },

    setUrls: (state, action) => {
      state.urls = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addUrl, removeUrl, setUrls, setLoading, setError } =
  urlsSlice.actions;

export default urlsSlice.reducer;
