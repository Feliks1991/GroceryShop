import DownArrow from "./assets/DownArrow.svg?react";
import Login from "./assets/Login.svg?react";
import UserPhoto from "./assets/Alex.png";
import Styles from "./UserPanel.module.scss";
import { Button } from "@/shared";
import { ModalWindow } from "@/widgets";
import { useAppDispatch } from "@/app/store/reduxTypes";
import { openModal } from "@/widgets/ModalWindow/model/ModalWindow.slice";

type UserPanelProps = {
  visible: boolean;
  open: () => void;
  close: () => void;
  userName: string;
};

const UserPanel = ({ visible, open, close, userName }: UserPanelProps) => {
  const dispatch = useAppDispatch();

  if (!userName) {
    return (
      <>
        <div className={Styles.loginButton}>
          <Button
            onClick={() => {
              dispatch(openModal("login"));
            }}
            type={"button"}
          >
            <div className={Styles.loginButtonContent}>
              <p>Войти</p>
              <Login />
            </div>
          </Button>
        </div>
        <ModalWindow />
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
