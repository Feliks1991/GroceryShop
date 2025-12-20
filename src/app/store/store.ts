import { configureStore, Middleware } from "@reduxjs/toolkit";
import filterReducer from "../../features/Filters/model/filters.slice.ts";
import { api } from "../api/Fetch.ts";
import { authReducer } from "./user.slice.ts";
import { deleteUser, logout } from "./userThunk.ts";
import { baseApi } from "@/shared";
import cartReReducer from "@/features/CartProductsCards/model/cart.slice.ts";

export const logoutMiddleware: Middleware = () => (next) => (action) => {
  const token = localStorage.getItem("accessToken");

  if ((logout.fulfilled.match(action) || deleteUser.fulfilled.match(action)) && token) {
    localStorage.removeItem("accessToken");
    return next(action);
  }
  next(action);
};

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    filterOptionsSlice: filterReducer,
    cartSlice: cartReReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    })
      .concat(baseApi.middleware)
      .concat(logoutMiddleware),
});
