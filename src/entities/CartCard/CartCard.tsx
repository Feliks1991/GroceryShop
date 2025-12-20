import Styles from "./CartCard.module.scss";
import Minus from "./assets/Minus.svg?react";
import Plus from "./assets/Plus.svg?react";
import { Checkbox, PercentageBadge } from "@/shared";
import type Product from "@/app/store/ProductType";
import { useRef } from "react";
import { useQuantityMutation } from "./api/cartCard.api";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxTypes";
import {
  qtyDecrease,
  qtyIncrease,
  toggleChecked,
} from "@/features/CartProductsCards/model/cart.slice";

type CartCardProps = {
  product: Omit<Product, "comments" | "rating"> & { quantity: number; checked: boolean };
};

export const CartCard = ({ product }: CartCardProps) => {
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [qtyChange] = useQuantityMutation();

  const qtyPostDebounce = (sku: string, newQty: number) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(async () => {
      await qtyChange({ [sku]: { quantity: newQty, checked: true } });
    }, 1000);
  };

  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.cartSlice[product.SKU]);

  return (
    <div className={Styles.cartCard}>
      <div className={Styles.checkboxWrapper}>
        <Checkbox
          onChange={() => dispatch(toggleChecked({ sku: product.SKU }))}
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
              dispatch(qtyDecrease({ sku: product.SKU }));
            }}
          >
            <Minus />
          </button>
          <p>{state.quantity}</p>
          <button
            onClick={() => {
              dispatch(qtyIncrease({ sku: product.SKU }));
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
