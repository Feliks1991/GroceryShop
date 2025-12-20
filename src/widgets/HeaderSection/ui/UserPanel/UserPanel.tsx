import DownArrow from "./assets/DownArrow.svg?react";
import Login from "./assets/Login.svg?react";
import UserPhoto from "./assets/Alex.png";
import Styles from "./UserPanel.module.scss";
import { useState } from "react";
import { Button } from "@/shared";
import { ModalWindowWrapper, ModalWindow } from "@/widgets";

type UserPanelProps = {
  visible: boolean;
  open: () => void;
  close: () => void;
  userName: string;
};

const UserPanel = ({ visible, open, close, userName }: UserPanelProps) => {
  const [loginPanelVisible, setLoginPanelVisible] = useState<boolean>(false);

  if (!userName) {
    return (
      <>
        <div className={Styles.loginButton}>
          <Button
            onClick={() => {
              setLoginPanelVisible(true);
            }}
            type={"button"}
          >
            <div className={Styles.loginButtonContent}>
              <p>Войти</p>
              <Login />
            </div>
          </Button>
        </div>
        <ModalWindowWrapper
          modalToggle={() => {
            setLoginPanelVisible(false);
          }}
          loginPanelVisible={loginPanelVisible}
        >
          <ModalWindow loginPanelVisible={loginPanelVisible} />
        </ModalWindowWrapper>
      </>
    );
  }

  return (
    <div className={Styles.userPanel}>
      <img className={Styles.userImg} src={UserPhoto} alt="" />
      <p className={Styles.userName}>{userName}</p>
      <div
        className={`${Styles.userMenuFlag} ${visible ? Styles.userMenuFlagReverse : ""}`}
        onMouseEnter={open}
        onMouseLeave={close}
      >
        <DownArrow />
      </div>
    </div>
  );
};

export default UserPanel;
