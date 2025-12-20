import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/Fetch";
import { store } from "./store";
import { useDispatch, useSelector } from "react-redux";

export type Error = {
  name: string | null;
  message: string | null;
  code: string | null;
  details: string | null;
};

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  extra: typeof api;
  rejectValue: string;
  serializedErrorType: Error;
}>();
