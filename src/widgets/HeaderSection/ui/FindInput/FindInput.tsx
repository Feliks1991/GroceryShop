import Styles from "./FindInput.module.scss";
import Search from "./assets/search.svg?react";

const FindInput = () => {
  return (
    <div className={Styles.inputWrapper}>
      <input className={Styles.input} type="text" placeholder="Найти товар" />
      <Search />
    </div>
  );
};

export default FindInput;
