import Styles from "./ProductPagePrice.module.scss";

type ProductPagePriceProps = {
  regularPrice: number;
  discountPrice: number;
  discount: boolean;
};

export const ProductPagePrice = ({
  regularPrice,
  discountPrice,
  discount,
}: ProductPagePriceProps) => {
  return (
    <div className={Styles.price}>
      <div className={Styles.regularPriceElement}>
        <p className={discount ? Styles.regular : Styles.bold}>
          {regularPrice}
          <span className={Styles.currency}>₽</span>
        </p>
        {discount && <span className={Styles.priceDescription}>Обычная цена</span>}
      </div>

      {discount && (
        <div className={Styles.discountPriceElement}>
          <p className={Styles.bold}>
            {discountPrice}
            <span className={Styles.currency}>₽</span>
          </p>
          <span className={Styles.priceDescription}>С картой Северяночки</span>
        </div>
      )}
    </div>
  );
};
