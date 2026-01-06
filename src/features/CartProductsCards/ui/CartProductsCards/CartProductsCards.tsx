import { CartCard } from "@/entities";
import { useGetCartQuery } from "../../api/cart.api";
import Styles from "./CartProductsCards.module.scss";
import { SectionWrapper } from "@/shared";
import { OrderSummary } from "@/widgets";
import { SelectedCheckboxHandler } from "../SelectedCheckboxHandler/SelectedCheckboxHandler";

export const CartProductsCards = () => {
  const { data = [], isSuccess } = useGetCartQuery();

  const hasItem = data.length > 0;


const p = process.env.NODE_ENV
  console.log(p);



  return (
    <SectionWrapper title="Корзина">
      {hasItem && <SelectedCheckboxHandler />}
      <div className={Styles.cart}>
        <div className={Styles.cartCards}>
          {isSuccess &&
            hasItem &&
            data.map((product) => <CartCard key={product.SKU} product={product} />)}
          {isSuccess && !hasItem && <h3> Корзина пуста</h3>}
        </div>
        <OrderSummary data={data} hasItem={hasItem} />
      </div>
    </SectionWrapper>
  );
};
