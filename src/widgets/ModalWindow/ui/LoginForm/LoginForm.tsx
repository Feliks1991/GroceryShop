import { SubmitHandler, useForm } from "react-hook-form";
import Styles from "./LoginForm.module.scss";
// import { LoginData } from "@/app/api/Fetch";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxTypes";
import { FormButton } from "../../../../shared/FormButton/FormButton";
import { FormInput } from "../../../../shared/FormInput/FormInput";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { login } from "@/app/store/userThunk";
import { LoginShema } from "@/app/store/zodTypesUser";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginFormProps = {
  state: "password" | "login" | "register";
  switcher: (state: "password" | "login") => void;
};

export const LoginForm = ({ state, switcher }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<z.infer<typeof LoginShema>>({
    resolver: zodResolver(LoginShema),
    mode: "onBlur",
  });

  const dispatch = useAppDispatch();

  const { error } = useAppSelector((state) => state.auth);

  const submit: SubmitHandler<z.infer<typeof LoginShema>> = async (data) => {
    await dispatch(login(data));
  };

  const emailCheck = async () => {
    const isValid = await trigger("email", { shouldFocus: true });
    if (isValid) {
      switcher("password");
    }
  };

  return (
    <form onSubmit={(event) => void handleSubmit(submit)(event)} className={Styles.loginForm}>
      {state === "login" && (
        <div className={Styles.loginForm}>
          <FormInput
            id={"email"}
            type={"email"}
            label={"E-mail"}
            register={register}
            error={errors.email}
          />
          <FormButton
            onClick={() => {
              void emailCheck();
            }}
            type={"button"}
          >
            Вход
          </FormButton>
        </div>
      )}
      {state === "password" && (
        <div className={Styles.loginForm}>
          <PasswordInput
            error={error ? error.message : errors.password?.message}
            id={"password"}
            type={"password"}
            label={"Пароль"}
            register={register}
          />
          <FormButton type="submit">Подтвердить</FormButton>
        </div>
      )}
    </form>
  );
};
