import { useAppDispatch } from "@/app/store/reduxTypes";
import DownArrow from "./assets/DownArrow.svg?react";
import Styles from "./UserControlPanel.module.scss";
import { useNavigate } from "react-router";
import { logout } from "@/app/store/userThunk";

export const UserControlPanel = () => {
  const dispatch = useAppDispatch();

  const logoutHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await dispatch(logout());
    localStorage.removeItem("accessToken");
  };

  const naigate = useNavigate();

  const toUserPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    void naigate("/user");
  };

  return (
    <div className={Styles.userDropDownButtons}>
      <button
        onClick={(event) => {
          toUserPage(event);
        }}
      >
        Профиль
        <span>
          <DownArrow />
        </span>
      </button>
      <button onClick={(event) => void logoutHandler(event)}>
        Выйти
        <span>
          <DownArrow />
        </span>
      </button>
    </div>
  );
};
