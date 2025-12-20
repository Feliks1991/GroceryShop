import Styles from "./SexChecker.module.scss";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type SexCheckerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};

export const SexChecker = <T extends FieldValues>({ control, name }: SexCheckerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={Styles.radioElement}>
          <p className={Styles.label}>Пол:</p>
          <div className={Styles.radio}>
            <label
              className={`${Styles.radioItem} ${field.value === "Мужской" ? Styles.radioActive : Styles.radioPassive}`}
              htmlFor="man"
            >
              Мужской
            </label>
            <input
              onChange={() => {
                field.onChange("Мужской");
              }}
              checked={field.value === "Мужской"}
              id="man"
              name={field.name}
              type="radio"
            />
            <label
              className={`${Styles.radioItem} ${field.value === "Женский" ? Styles.radioActive : Styles.radioPassive}`}
              htmlFor="woman"
            >
              Женский
            </label>
            <input
              onChange={() => {
                field.onChange("Женский");
              }}
              checked={field.value === "Женский"}
              id="woman"
              name={field.name}
              type="radio"
            />
          </div>
        </div>
      )}
    />
  );
};
