import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user") || null);
const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logout: () => {
      localStorage.removeItem("user");
      return { isLoggedIn: false, user: null };
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    }
  }
});

const userReducer = userSlice.reducer;

export default userReducer;

export const { logout, login } = userSlice.actions;
