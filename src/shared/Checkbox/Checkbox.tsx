import { ReactNode } from "react";
import Styles from "./Checkbox.module.scss";
import clsx from "clsx";

type CheckboxProps = {
  children?: ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  partialCheck?: boolean;
  checked: boolean;
};

export const Checkbox = ({ children, onChange, partialCheck, checked }: CheckboxProps) => {
  return (
    <label className={Styles.label}>
      <input
        className={Styles.input}
        checked={checked}
        onChange={(event) => {
          onChange(event);
        }}
        type="checkbox"
      />
      <span
        className={clsx(Styles.span, checked && Styles.checked, partialCheck && Styles.mixed)}
      />
      {children}
    </label>
  );
};
