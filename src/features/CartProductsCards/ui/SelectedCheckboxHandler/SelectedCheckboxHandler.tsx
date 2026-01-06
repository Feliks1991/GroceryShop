import { AppState, useAppDispatch, useAppSelector } from "@/app/store/reduxTypes";
import { Checkbox } from "@/shared";
import { createSelector } from "@reduxjs/toolkit";
import Styles from "./SelectedCheckboxHandler.module.scss";
import { useDeleteSelectedItemsMutation } from "../../api/cart.api";
import { checkAllToggle } from "@/entities/CartCard/model/cartCard.slice";

export const SelectedCheckboxHandler = () => {
  const [deleteSelected] = useDeleteSelectedItemsMutation();
  const dispatch = useAppDispatch();

  const selectCheckedProduct = createSelector([(state: AppState) => state.cartSlice], (cart) => {
    const items = Object.values(cart);
    const checked = items.filter((item) => item.checked);
    return {
      all: checked.length === items.length && items.length > 0,
      some: checked.length > 0 && checked.length < items.length,
    };
  });

  const { all, some } = useAppSelector(selectCheckedProduct);

  return (
    <div className={Styles.cartControllers}>
      <Checkbox
        checked={all}
        partialCheck={some}
        onChange={(event) => {
          dispatch(checkAllToggle({ checked: event.target.checked }));
        }}
      >
        <p>{all ? "Снять выделение" : "Выделить всё"}</p>
      </Checkbox>
      <button onClick={() => void deleteSelected()} className={Styles.deleteButton}>
        Удалить выбранные
      </button>
    </div>
  );
};
