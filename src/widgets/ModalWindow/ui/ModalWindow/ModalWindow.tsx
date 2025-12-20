import { useEffect, useState } from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import Styles from "./ModalWindow.module.scss";
import BackArrow from "./assets/BackArrow.svg?react";

type ModalWindowProps = {
  loginPanelVisible?: boolean;
};

export const ModalWindow = ({ loginPanelVisible }: ModalWindowProps) => {
  useEffect(() => {
    if (!loginPanelVisible) {
      setForm("login");
    }
  }, [loginPanelVisible]);

  const [form, setForm] = useState<"login" | "password" | "register">("login");

  return (
    <div>
      {(form === "login" || form === "password") && (
        <>
          <h2 className={Styles.title}>Войти</h2>
          <LoginForm state={form} switcher={setForm} />
        </>
      )}

      {form === "register" && (
        <>
          <h2 className={Styles.title}>Регистрация</h2>
          <RegisterForm />
        </>
      )}
      <div className={Styles.buttonsWrapper}>
        {form === "password" && (
          <button
            className={Styles.buttonPrew}
            onClick={() => {
              setForm("login");
            }}
          >
            <BackArrow /> <p className={Styles.prewButtonName}>Вернуться</p>
          </button>
        )}
        {form === "login" && (
          <button
            className={Styles.regButton}
            onClick={() => {
              setForm("register");
            }}
          >
            Регистрация
          </button>
        )}
        {form === "register" && (
          <button
            className={Styles.regButton}
            onClick={() => {
              setForm("login");
            }}
          >
            Войти
          </button>
        )}
      </div>
    </div>
  );
};
