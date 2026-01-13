import { configureStore, Middleware } from "@reduxjs/toolkit";
import filterReducer from "../../features/Filters/model/filters.slice.ts";
import { api } from "../api/Fetch.ts";
import { authReducer } from "./user.slice.ts";
import { deleteUser, logout } from "./userThunk.ts";
import { baseApi } from "@/shared";
import cartReReducer from "@/entities/CartCard/model/cartCard.slice.ts";
import { listenerMiddleware } from "./listeners/cart.listeners.ts";
import modalReducer from "@/widgets/ModalWindow/model/ModalWindow.slice.ts";

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
    modalSlice: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    })
      .prepend(listenerMiddleware.middleware)
      .concat(baseApi.middleware)
      .concat(logoutMiddleware),
});
