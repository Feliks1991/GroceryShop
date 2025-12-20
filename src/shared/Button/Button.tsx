import Styles from "./Button.module.scss";

type ButtonProps = {
  children: string | React.ReactNode;
  type: "submit" | "button";
  onClick?: (arg?: any) => void;
  disabled?: boolean;
};

export const Button = ({ children, type, onClick, disabled }: ButtonProps): JSX.Element => {
  return (
    <button
      type={type}
      onClick={(event) => {
        if (onClick) {
          onClick();
        }
        event.stopPropagation();
      }}
      className={Styles.button}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
