import { Layout } from "@/shared";
import { createBrowserRouter } from "react-router";
import { RouteConfig } from "./RouteConfig";
import { logout, user } from "../store/userThunk";
import { store } from "../store/store";

export const router = createBrowserRouter([
  {
    path: "/",
    HydrateFallback: () => null,
    element: <Layout />,
    loader: async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        await store.dispatch(user());
      } else {
        await store.dispatch(logout());
      }
    },
    children: RouteConfig.map(({ index, path, ...rest }) =>
      index ? { index: true, element: rest.element } : { path, element: rest.element },
    ),
  },
]);
