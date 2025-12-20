import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type Product from "@/app/store/ProductType";

type InitialState = Record<
  string,
  {
    checked: boolean;
    quantity: number;
  }
>;

type CartProduct = Omit<Product, "rating" | "comments"> & { quantity: number; checked: boolean };

const initialState: InitialState = {};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    cartRestore: (_state, action: PayloadAction<CartProduct[]>) => {
      return Object.fromEntries(
        action.payload.map((item) => [
          item.SKU,
          { quantity: item.quantity, checked: item.checked },
        ]),
      );
    },

    qtyIncrease: (state, action: PayloadAction<{ sku: string }>) => {
      const { sku } = action.payload;
      if (state[sku].quantity >= 0) {
        ++state[sku].quantity;
      }
    },
    qtyDecrease: (state, action: PayloadAction<{ sku: string }>) => {
      const { sku } = action.payload;
      if (state[sku].quantity > 0) {
        --state[sku].quantity;
      }
    },
    toggleChecked: (state, action: PayloadAction<{ sku: string }>) => {
      const { sku } = action.payload;
      state[sku].checked = !state[sku].checked;
    },
    toggleAll: (state, action: PayloadAction<{ checked: boolean }>) => {
      for (const element in state) {
        state[element].checked = action.payload.checked;
      }
    },
  },
});

export const { cartRestore, qtyIncrease, qtyDecrease, toggleChecked, toggleAll } =
  cartSlice.actions;

export default cartSlice.reducer;
