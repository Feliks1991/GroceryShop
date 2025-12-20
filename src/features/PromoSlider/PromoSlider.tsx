import Styles from "./PromoSlider.module.scss";
import deliveryImage from "./assets/deliveryImage.png";
import StoresCash from "./assets/StoresCash.svg?react";
// import { FullScreenWrapper } from "@/shared/ui";

export const PromoSlider = () => {
  return (
    <div className={Styles.slider}>
      <div className={Styles.dinamicSlide}>
        <div className={Styles.delivery}>
          <img className={Styles.deliveryImage} src={deliveryImage} alt="" />
          <p className={Styles.deliveryDescr}>Доставка бесплатно от 1000 ₽</p>
        </div>
      </div>
      <div className={Styles.staticSlide}>
        <div className={Styles.cash}>
          <div className={Styles.ground}></div>
          <StoresCash className={Styles.storesCash} />
        </div>
      </div>
    </div>
  );
};
