import { CartCard } from "@/entities";
import { useGetCartQuery } from "./api/cart.api";
import Styles from "./CartProductsCards.module.scss";
import { Button, Checkbox, SectionWrapper } from "@/shared";
import { AppState, useAppDispatch, useAppSelector } from "@/app/store/reduxTypes";
import { toggleAll } from "./model/cart.slice";
import { createSelector } from "@reduxjs/toolkit";

export const CartProductsCards = () => {
  const { data, isSuccess } = useGetCartQuery();

  const dispatch = useAppDispatch();

  const selectCheckedProduct = createSelector([(state: AppState) => state.cartSlice], (cart) => {
    const items = Object.values(cart);
    const checked = items.filter((item) => item.checked);
    return {
      checkedItems: cart,
      all: checked.length === items.length && items.length > 0,
      some: checked.length > 0 && checked.length < items.length,
    };
  });

  const { checkedItems, all, some } = useAppSelector(selectCheckedProduct);

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

  const selectAllToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAll({ checked: event.target.checked }));
  };

  return (
    <SectionWrapper title="Корзина">
      {isSuccess && (
        <div className={Styles.cartControllers}>
          <Checkbox
            checked={all}
            partialCheck={some}
            onChange={(event) => {
              selectAllToggle(event);
            }}
          >
            <p>{all ? "Снять выделение" : "Выделить всё"}</p>
          </Checkbox>
          <button className={Styles.deleteButton}>Удалить выбранные</button>
        </div>
      )}
      <div className={Styles.cart}>
        <div className={Styles.cartCards}>
          {isSuccess ? (
            data.map((product) => <CartCard key={product.SKU} product={product} />)
          ) : (
            <h3> Корзина пуста</h3>
          )}
        </div>
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
          {isSuccess && <Button type={"button"}>Оформить заказ</Button>}
        </div>
      </div>
    </SectionWrapper>
  );
};
