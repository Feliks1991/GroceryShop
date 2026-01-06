import type Product from "@/app/store/ProductType";
import Styles from "./OrderSummary.module.scss";
import { Button } from "@/shared";
import { useAppSelector } from "@/app/store/reduxTypes";

type OrderSummaryProps = {
  data?: (Omit<Product, "comments" | "rating"> & {
    quantity: number;
    checked: boolean;
  })[];
  hasItem: boolean;
};

export const OrderSummary = ({ data, hasItem: isExist }: OrderSummaryProps) => {
  const cartState = useAppSelector((state) => state.cartSlice);

  const discountedPrice = () => {
    if (data) {
      return data.reduce((sum, current) => {
        const cartItem = cartState[current.SKU];
        if (!cartItem.checked) {
          return sum;
        }
        const price = current.promo.discount ? current.price.discountCard : current.price.regular;
        return sum + price * cartItem.quantity;
      }, 0);
    }
    return 0;
  };

  const totalprice = () => {
    if (data) {
      return data.reduce((sum, current) => {
        const cartItem = cartState[current.SKU];
        if (!cartItem.checked) {
          return sum;
        }
        return sum + current.price.regular * cartItem.quantity;
      }, 0);
    }
    return 0;
  };

  return (
    <div className={Styles.orderBlock}>
      <div className={Styles.priceBlock}>
        <div>
          <p className={Styles.title}>{data?.length} товара</p>
          <p className={Styles.totalPrice}>{totalprice()}&nbsp;₽</p>
        </div>
        <div>
          <p className={Styles.title}>Скидка</p>
          <p className={Styles.discount}>{discountedPrice() - totalprice()}&nbsp;₽</p>
        </div>
        <div>
          <p className={Styles.title}>Итог</p>
          <p className={Styles.discountedPrice}>{discountedPrice()}&nbsp;₽</p>
        </div>
      </div>
      {isExist && <Button type={"button"}>Оформить заказ</Button>}
    </div>
  );
};
