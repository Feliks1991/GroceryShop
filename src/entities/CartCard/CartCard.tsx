import Styles from "./CartCard.module.scss";
import Minus from "./assets/Minus.svg?react";
import Plus from "./assets/Plus.svg?react";
import { Checkbox, PercentageBadge } from "@/shared";
import type Product from "@/app/store/ProductType";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxTypes";
import { checkedToggle, quantityChange } from "./model/cartCard.slice";

type CartCardProps = {
  product: Omit<Product, "comments" | "rating"> & { quantity: number; checked: boolean };
};

export const CartCard = ({ product }: CartCardProps) => {
  const state = useAppSelector((state) => state.cartSlice[product.SKU]);

  const dispatch = useAppDispatch();

  return (
    <div className={Styles.cartCard}>
      <div className={Styles.checkboxWrapper}>
        <Checkbox
          onChange={() => {
            const status = !state.checked;
            dispatch(checkedToggle({ sku: product.SKU, checked: status }));
          }}
          checked={state.checked}
        />
      </div>
      <div className={Styles.cardDescription}>
        <div className={Styles.cardImgWrapper}>
          <img src={product.TitleImg} />
        </div>
        <div className={Styles.metaWrapper}>
          <p>{product.name}</p>
          <div className={Styles.priceWrapper}>
            {product.promo.discount && (
              <div>
                <p className={Styles.priceBold}>{product.price.discountCard} ₽</p>
                <span>С картой</span>
              </div>
            )}
            <div>
              <p className={product.promo.discount ? Styles.priceRegular : Styles.priceBold}>
                {product.price.regular} ₽
              </p>
              {product.promo.discount && <span>Обычная</span>}
            </div>
            <p>за шт.</p>
            {product.promo.discount && (
              <div className={Styles.badgeWrapper}>
                <PercentageBadge percent={product.promo.percentage} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={Styles.price}>
        <div className={Styles.qtySelector}>
          <button
            onClick={() => {
              const qty = state.quantity - 1;
              if (qty >= 1 && qty <= 20) {
                dispatch(quantityChange({ sku: product.SKU, quantity: qty }));
              }
            }}
          >
            <Minus />
          </button>
          <p>{state.quantity}</p>
          <button
            onClick={() => {
              const qty = state.quantity + 1;
              if (qty >= 1 && qty <= 20) {
                dispatch(quantityChange({ sku: product.SKU, quantity: qty }));
              }
            }}
          >
            <Plus />
          </button>
        </div>
        <div>
          {product.promo.discount ? (
            <>
              <p className={Styles.totalPrice}>{state.quantity * product.price.discountCard} ₽</p>
              <p className={Styles.strike}>{state.quantity * product.price.regular} ₽</p>
            </>
          ) : (
            <p className={Styles.totalPrice}>{state.quantity * product.price.regular} ₽</p>
          )}
        </div>
      </div>
    </div>
  );
};
