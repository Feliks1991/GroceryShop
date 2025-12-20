import { ReactNode } from "react";
import Styles from "./GridContainer.module.scss";

type GridContainerProps = {
  children: ReactNode;
};

export const GridContainer = ({ children }: GridContainerProps) => {
  return <div className={Styles.grid}>{children}</div>;
};
