import Styles from "./ProductPrice.module.scss";

type ProductPriceProps = {
  regular: number;
  card?: number;
  discount: boolean;
};

export const ProductPrice: React.FC<ProductPriceProps> = ({ ...price }) => {
  return (
    <div className={Styles.price}>
      {price.discount ? (
        <div className={Styles.priceWrapper}>
          <p className={Styles.boldPrice}>{price.card} ₽</p>
          <span className={Styles.priceDescription}>С картой</span>
        </div>
      ) : null}
      <div className={Styles.priceWrapper}>
        <p className={price.discount ? Styles.regularPrice : Styles.boldPrice}>{price.regular} ₽</p>
        {price.discount ? <span className={Styles.priceDescription}>Регулярная</span> : null}
      </div>
    </div>
  );
};
