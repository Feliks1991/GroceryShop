import { useAppDispatch } from "@/app/store/reduxTypes";
import DownArrow from "./assets/DownArrow.svg?react";
import Styles from "./UserControlPanel.module.scss";
import { useLocation, useNavigate } from "react-router";
import { logout } from "@/app/store/userThunk";

export const UserControlPanel = () => {
  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    await dispatch(logout());
    localStorage.removeItem("accessToken");
  };

  const naigate = useNavigate();

  const toUserPage = () => {
    void naigate("/user");
  };

  return (
    <div className={Styles.userDropDownButtons}>
      <button
        type="button"
        onClick={() => {
          toUserPage();
        }}
      >
        Профиль
        <span>
          <DownArrow />
        </span>
      </button>
      <button type="button" onClick={() => void logoutHandler()}>
        Выйти
        <span>
          <DownArrow />
        </span>
      </button>
    </div>
  );
};
