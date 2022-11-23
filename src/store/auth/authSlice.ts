import { user } from "types/user";
import { createSlice } from "@reduxjs/toolkit";
import { formData, initUser } from "context/auth-context";
import { AppDispatch } from "../index";
import * as auth from "auth-provider";

interface User {
  user: user | null;
}
const initialState: User = {
  user: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});
export const { setUser } = authSlice.actions;
export const login = (from: formData) => (dispatch: AppDispatch) =>
  auth.login(from).then((user) => dispatch(setUser(user)));
export const register = (from: formData) => (dispatch: AppDispatch) =>
  auth.register(from).then((user) => dispatch(setUser(user)));
export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then((user) => dispatch(setUser(null)));
export const init = () => (dispatch: AppDispatch) =>
  initUser().then((user) => dispatch(setUser(user)));
