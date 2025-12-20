import Styles from "./RegisterForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../../../../shared/FormInput/FormInput";
import { FormButton } from "../../../../shared/FormButton/FormButton";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { useAppDispatch } from "@/app/store/reduxTypes";
import { registerUser } from "@/app/store/userThunk";
import { UpsertUserSchema } from "@/app/store/zodTypesUser";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SexChecker } from "@/shared";

// const RegisterSchema  = UpsertUserSchema.partial({name: true, password: true, email: true, phone: true})

type Register = z.infer<typeof UpsertUserSchema>;

export const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Register>({
    resolver: zodResolver(UpsertUserSchema),
    mode: "onBlur",
    defaultValues: {
      sex: "Женский",
    },
  });

  const submit: SubmitHandler<Register> = async (data) => {
    await dispatch(registerUser(data));
  };

  return (
    <form onSubmit={(event) => void handleSubmit(submit)(event)} className={Styles.registerForm}>
      <div className={Styles.fields}>
        <div className={Styles.inputColumn}>
          <FormInput
            label={"Телефон"}
            id={"phone"}
            type={"text"}
            register={register}
            error={errors.phone}
          />
          <FormInput
            label={"Фамилия"}
            id={"lastname"}
            type={"text"}
            register={register}
            error={errors.lastname}
          />
          <FormInput
            label={"Имя"}
            id={"name"}
            type={"text"}
            register={register}
            error={errors.name}
          />
          <PasswordInput
            id={"password"}
            type={"password"}
            label={"Пароль"}
            register={register}
            error={errors.password?.message}
          />
          <PasswordInput id={"confirmPassword"} type={"password"} label={"Повторить пароль"} />
        </div>
        <div className={Styles.inputColumn}>
          <FormInput
            label={"День рождения"}
            id={"birthday"}
            type={"date"}
            register={register}
            error={errors.birthday}
          />
          <FormInput
            label={"Страна"}
            id={"country"}
            type={"text"}
            register={register}
            error={errors.country}
          />
          <FormInput
            label={"Город"}
            id={"city"}
            type={"text"}
            register={register}
            error={errors.country}
          />
          <SexChecker control={control} name={"sex"} />
          <FormInput
            label={"Е-mail"}
            id={"email"}
            type={"email"}
            register={register}
            error={errors.email}
          />
        </div>
      </div>
      <div className={Styles.formBtnWrap}>
        <FormButton type={"submit"}>Отправить</FormButton>
      </div>
    </form>
  );
};
