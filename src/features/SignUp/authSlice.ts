import { getCookie } from "@/shared/utils/authToken";
import { createSlice } from "@reduxjs/toolkit";

const token = getCookie();

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string; email: string } | null;
}

const initialState: AuthState = {
  isAuthenticated: !!token.authToken,
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
