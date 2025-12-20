import { createSlice } from "@reduxjs/toolkit";
import z from "zod";
import { BaseUserSchema } from "./zodTypesUser";
import { deleteUser, editUser, login, logout, registerUser, user } from "./userThunk";
import type { Error } from "@/app/store/reduxTypes";

type User = {
  user: z.infer<typeof BaseUserSchema> | null;
  _backup?: z.infer<typeof BaseUserSchema>;
  loading: boolean;
  error: Error | null;
  message: string | null;
};

const initialState: User = {
  user: null,
  message: null,
  loading: false,
  error: {
    name: null,
    message: null,
    code: null,
    details: null,
  },
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        const { message, ...data } = action.payload;
        state.user = data;
        state.message = message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      //getUser
      .addCase(user.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
        state.message = null;
      })
      .addCase(user.fulfilled, (state, action) => {
        state.loading = false;
        const { message, ...data } = action.payload;
        state.user = data;
        state.message = message;
      })
      .addCase(user.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      //logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      //register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      //update
      .addCase(editUser.pending, (state, action) => {
        state.loading = true;
        state.message = null;
        if (state.user) {
          state._backup = state.user;
        }
        state.user = action.meta.arg;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        const { message, ...data } = action.payload;
        state.user = data;
        state.message = message;
        delete state._backup;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        if (state._backup) {
          state.user = state._backup;
        }
        state.error = action.error;
        delete state._backup;
      })
      //delete
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const authReducer = userSlice.reducer;
