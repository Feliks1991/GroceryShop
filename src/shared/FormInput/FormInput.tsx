import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import Styles from "./FormInput.module.scss";

type FormInputProps<T extends FieldValues> = {
  id: Path<T>;
  type: "text" | "date" | "email";
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
};

export const FormInput = <T extends FieldValues>({
  id,
  type,
  label,
  register,
  error,
}: FormInputProps<T>) => {
  return (
    <div className={Styles.inputWrapper}>
      <label className={Styles.label} htmlFor={id}>
        {label}:
      </label>
      <input
        className={`${Styles.input} ${error ? Styles.errorBorder : ""}`}
        {...register(id)}
        id={id}
        type={type}
      />
      {error && <span className={Styles.error}>{error.message}</span>}
    </div>
  );
};
