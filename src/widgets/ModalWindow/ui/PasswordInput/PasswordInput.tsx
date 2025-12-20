import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import Styles from "./Password.module.scss";
import Eye from "./assets/Eye.svg?react";
import { useState } from "react";

type PasswordInputProps<T extends FieldValues> = {
  id: Path<T>;
  type: "password";
  label: string;
  register?: UseFormRegister<T>;
  error?: string | null;
};

export const PasswordInput = <T extends FieldValues>({
  id,
  type,
  label,
  register,
  error,
}: PasswordInputProps<T>) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const visibleHandler = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className={Styles.inputElement}>
      <label className={Styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={`${Styles.passwordInput} ${error ? Styles.errorBorder : ""}`}>
        <input
          className={Styles.input}
          {...register?.(id)}
          id={id}
          type={passwordVisible ? "text" : type}
        />
        <Eye onClick={visibleHandler} className={Styles.passwordIcon} />
      </div>
      {error && <span className={Styles.error}>{error}</span>}
    </div>
  );
};
