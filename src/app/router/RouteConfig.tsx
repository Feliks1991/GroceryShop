import { MainPage, CategoryPage, ProductPage, UserPage, CartPage } from "@/pages";
import { RouteObject } from "react-router";
import { RouteGuard } from "./RouteGuard";

export const RouteConfig: RouteObject[] = [
  {
    index: true,
    element: <MainPage />,
  },
  { path: "/catalog/:category", element: <CategoryPage /> },
  { path: "/catalog/:category/:sku", element: <ProductPage /> },
  {
    path: "user",
    element: <RouteGuard />,
    children: [{ index: true, element: <UserPage /> }]
  },
  { path: "/cart", element: <CartPage /> },
];
