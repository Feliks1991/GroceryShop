import { ReactNode } from "react";
import Styles from "./FormButton.module.scss";

type FormButtonProps = {
  type: "button" | "submit";
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export const FormButton = ({ type, children, onClick, disabled }: FormButtonProps) => {
  return (
    <button disabled={disabled} onClick={onClick} className={Styles.modalButton} type={type}>
      {children}
    </button>
  );
};
