import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { RouterProvider } from "react-router/dom";
import { router } from "./app/router/Router.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store/store.ts";

createRoot(document.getElementById("root") as Element).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
