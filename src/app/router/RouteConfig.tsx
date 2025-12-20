import { MainPage, CategoryPage, ProductPage, UserPage, CartPage } from "@/pages";
import { RouteObject } from "react-router";

export const RouteConfig: RouteObject[] = [
  {
    index: true,
    element: <MainPage />,
  },
  { path: "/catalog/:category", element: <CategoryPage /> },
  { path: "/catalog/:category/:sku", element: <ProductPage /> },
  { path: "/user", element: <UserPage /> },
  { path: "/cart", element: <CartPage /> },
];
