import { configureStore } from "@reduxjs/toolkit";
import { projectListSlice } from "./projectList/projectListSlice";
import { authSlice } from "./auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};
export const store = configureStore({
  reducer: rootReducer,
});
// 暴露出两个类型
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
