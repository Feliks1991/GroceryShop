import Styles from "./CatalogButton.module.scss";

type CatalogButtonProps = {
  open: () => void;
  close: () => void;
};

const CatalogButton = ({ open, close }: CatalogButtonProps) => {
  return (
    <button className={Styles.catalogButton}>
      <div onMouseEnter={open} onMouseLeave={close} className={Styles.catalogButtonIcon}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className={Styles.catalogButtonName}>Каталог</p>
    </button>
  );
};

export default CatalogButton;
