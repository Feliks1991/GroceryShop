import { createPortal } from "react-dom";
import Styles from "./ModalWindow.module.scss";
import X from "./assets/X.svg?react";
import { LoginForm, RegisterForm } from "..";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxTypes";
import { close } from "./model/ModalWindow.slice";

export const ModalWindow = () => {
  const modalState = useAppSelector((state) => state.modalSlice);
  const dispatch = useAppDispatch();

  if (!modalState.type) {
    return null;
  }

  return createPortal(
    <div className={Styles.wr}>
      <div className={Styles.modalWindow}>
        <button className={Styles.closeButton} onClick={() => dispatch(close())}>
          <X />
        </button>
        <div className={Styles.modalWindowContent}>
          {modalState.type === "login" && <LoginForm />}
          {modalState.type === "register" && <RegisterForm />}
        </div>
      </div>
    </div>,
    document.body,
  );
};
