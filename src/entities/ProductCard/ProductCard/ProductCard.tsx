import { ProductImage } from "../ProductImage/ProductImage";
import Styles from "./ProductCard.module.scss";
import { Button, StarsRating } from "@/shared";
import { ProductPrice } from "../ProductPrice/ProductPrice";
import { useNavigate } from "react-router";
import type Product from "@/app/store/ProductType";
import { useCartToggleMutation } from "../api/addCart.api";

type ProductCardProps = Pick<
  Product,
  "SKU" | "promo" | "TitleImg" | "name" | "price" | "rating" | "category"
>;

export const ProductCard = (data: ProductCardProps) => {
  const navigate = useNavigate();

  const goToProduct = () => {
    void navigate(`../catalog/${data.category}/${data.SKU}`);
  };

  const [cartToggle] = useCartToggleMutation();

  const addCartHandler = async () => {
    void (await cartToggle({ category: data.category, SKU: data.SKU }));
  };

  return (
    <div onClick={goToProduct} className={Styles.card}>
      <div className={Styles.cardImg}>
        <ProductImage
          percent={data.promo.discount ? data.promo.percentage : undefined}
          img={data.TitleImg}
          SKU={data.SKU}
          category={data.category}
        />
      </div>
      <div className={Styles.description}>
        <div className={Styles.descriptionIndent}>
          <ProductPrice
            regular={data.price.regular}
            card={data.price.discountCard}
            discount={data.promo.discount}
          />
          <p
            className={`${Styles.itemDescription} ${data.promo.discount ? "" : Styles.itemDescriptionIndent}`}
          >
            {data.name}
          </p>
        </div>
        <div className={Styles.descriptionIndent}>
          <StarsRating value={data.rating.average} disabled />
          <Button onClick={() => void addCartHandler()} type="button">
            В корзину
          </Button>
        </div>
      </div>
    </div>
  );
};
