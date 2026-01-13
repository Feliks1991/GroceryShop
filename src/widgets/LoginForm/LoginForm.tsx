import { FormInput, PasswordInput, FormButton } from "@/shared";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Styles from "./LoginForm.module.scss";
import BackArrow from "./assets/BackArrow.svg?react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginShema } from "@/app/store/zodTypesUser";
import { useAppDispatch } from "@/app/store/reduxTypes";
import { login } from "@/app/store/userThunk";
import { switchType } from "../ModalWindow/model/ModalWindow.slice";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [loginFormState, setLoginFormState] = useState<"email" | "password">("email");

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<z.infer<typeof LoginShema>>({
    resolver: zodResolver(LoginShema),
    mode: "onBlur",
  });

  const emailCheck = async () => {
    const isValid = await trigger("email", { shouldFocus: true });
    if (isValid) {
      setLoginFormState("password");
    }
  };

  const submit: SubmitHandler<z.infer<typeof LoginShema>> = async (data) => {
    await dispatch(login(data));
  };

  return (
    <form className={Styles.loginForm} onSubmit={(event) => void handleSubmit(submit)(event)}>
      <p className={Styles.title}>Вход</p>
      <div style={{ display: loginFormState === "email" ? "block" : "none" }}>
        <FormInput
          id={"email"}
          type={"email"}
          label={"E-mail"}
          register={register}
          error={errors.email}
        />
        <FormButton type={"button"} onClick={() => void emailCheck()}>
          Вход
        </FormButton>
      </div>
      <div style={{ display: loginFormState === "password" ? "block" : "none" }}>
        <PasswordInput
          id={"password"}
          type={"password"}
          label={"Пароль"}
          register={register}
          autoComplete={"current-password"}
        />
        <FormButton type={"submit"}>Подтвердить</FormButton>
      </div>
      {loginFormState === "password" ? (
        <button
          className={Styles.returnButton}
          type="button"
          onClick={() => {
            setLoginFormState("email");
          }}
        >
          <BackArrow />
          <p>Вернуться</p>
        </button>
      ) : (
        <div className={Styles.stateBtnWrap}>
          <button
            className={Styles.stateButton}
            type="button"
            onClick={() => dispatch(switchType("register"))}
          >
            Регистрация
          </button>
        </div>
      )}
    </form>
  );
};
