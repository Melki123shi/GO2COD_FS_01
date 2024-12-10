import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../services/types";

export const initialState: UserState = {
  currentUser: null,
  signedIn: false,
  error: null,
  loading: false,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signinSuccess: (state, action) => {
      state.signedIn = true;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    signinWithGoogleSucess: (state, action) => {
      state.signedIn = true;
      state.currentUser = action.payload.data;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    signinFaliure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getuserSucess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.token = null;
      state.currentUser = null;
      state.signedIn = false;
      state.error = null;
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.signedIn = true;
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    updateUserFaliure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signinStart,
  signinFaliure,
  signinSuccess,
  signinWithGoogleSucess,
  getUserStart,
  getuserSucess,
  logout,
  updateUserStart,
  updateUserFaliure,
  updateUserSuccess,

} = userSlice.actions;

export default userSlice.reducer;
