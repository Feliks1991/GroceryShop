import { ReactNode } from "react";
import Styles from "./FullScreenWrapper.module.scss";

type FullScreenWrapperProps = {
  children: ReactNode;
};

export const FullScreenWrapper = ({ children }: FullScreenWrapperProps): JSX.Element => {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.wrapperContent}>{children}</div>
    </div>
  );
};
