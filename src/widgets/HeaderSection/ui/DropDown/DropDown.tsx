import { ReactNode } from "react";
import Styles from "./DropDown.module.scss";

type DropDownProps = {
  children: ReactNode;
  visible: boolean;
  closeCanceling: () => void;
  close: () => void;
};

export const DropDown = ({ children, visible, closeCanceling, close }: DropDownProps) => {
  return (
    <div
      onMouseEnter={closeCanceling}
      onMouseLeave={close}
      className={`${Styles.dropdown} ${visible ? Styles.dropdownVisible : ""}`}
    >
      {children}
    </div>
  );
};
