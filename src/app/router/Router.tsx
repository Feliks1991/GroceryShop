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
      // const userData = useAppSelector(state=> state.auth.user)
      if (token ) {
        await store.dispatch(user());
      }
    },
    children: RouteConfig
  },
]);
