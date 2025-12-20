import { Footer, Header } from "@/widgets";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
