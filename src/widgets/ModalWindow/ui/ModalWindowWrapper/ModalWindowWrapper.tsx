import { createPortal } from "react-dom";
import Styles from "./ModalWindowWrapper.module.scss";
import X from "./assets/x.svg?react";
import { useEffect } from "react";

type ModalWindowProps = {
  children: React.ReactNode;
  modalToggle: () => void;
  loginPanelVisible: boolean;
};

export const ModalWindowWrapper = ({
  children,
  modalToggle,
  loginPanelVisible,
}: ModalWindowProps) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") modalToggle();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [modalToggle]);

  return createPortal(
    <div className={`${Styles.modalWrapper} ${loginPanelVisible ? Styles.modalVisible : ""}`}>
      <div className={Styles.modalElements}>
        <button
          onClick={(event) => {
            event.preventDefault();
            modalToggle();
          }}
          className={Styles.closeButton}
        >
          <X />
        </button>
        <div className={Styles.modalContent}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};
