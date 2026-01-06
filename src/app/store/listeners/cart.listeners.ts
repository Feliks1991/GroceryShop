import { cartApi } from "@/features/CartProductsCards/api/cart.api";
import { AppDispatch, AppState } from "../reduxTypes";
import {
  cartRestore,
  checkAllToggle,
  checkedToggle,
  quantityChange,
} from "@/entities/CartCard/model/cartCard.slice";
import { cartCardApi } from "@/entities/CartCard/api/cartCard.api";
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

export const listenerMiddleware = createListenerMiddleware();

const startAppListening = listenerMiddleware.startListening.withTypes<AppState, AppDispatch>();

startAppListening({
  matcher: isAnyOf(checkedToggle, quantityChange, checkAllToggle),
  effect: async (_action, listenerApi) => {
    await listenerApi.delay(1000);
    listenerApi.cancelActiveListeners();
    const state = listenerApi.getState().cartSlice;
    await listenerApi.dispatch(cartCardApi.endpoints.cartStateUpdate.initiate(state));
  },
});

startAppListening({
  matcher: cartApi.endpoints.getCart.matchFulfilled,
  effect: (action, listenerApi) => {
    const cartSliceData = Object.fromEntries(
      action.payload.map((item) => [item.SKU, { quantity: item.quantity, checked: item.checked }]),
    );

    listenerApi.dispatch(cartRestore(cartSliceData));
  },
});
