// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const email = localStorage.getItem("email");
const token = localStorage.getItem("token");

const initialState = {
  email: email ? email : null,
  token: token ? token : null,
  name: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {

      state.email = action.payload.email;
      state.token = action.payload.token;
      state.name = action.payload.name;

      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("name", action.payload.name);
    },
    logout: (state) => {
      state.email = null;
      state.token = null;

      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("name");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
