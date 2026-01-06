import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = Record<
  string,
  {
    checked: boolean;
    quantity: number;
  }
>;

const initialState: InitialState = {};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    cartRestore: (
      _state,
      action: PayloadAction<Record<string, { checked: boolean; quantity: number }>>,
    ) => {
      return action.payload;
    },
    quantityChange: (state, action: PayloadAction<{ sku: string; quantity: number }>) => {
      const { sku, quantity } = action.payload;
      state[sku].quantity = quantity;
    },
    checkedToggle: (state, action: PayloadAction<{ sku: string; checked: boolean }>) => {
      const { sku, checked } = action.payload;
      state[sku].checked = checked;
    },
    checkAllToggle: (state, action: PayloadAction<{ checked: boolean }>) => {
      const { checked } = action.payload;
      for (const key in state) {
        state[key].checked = checked;
      }
    },
  },
});

export const { cartRestore, quantityChange, checkedToggle, checkAllToggle } = cartSlice.actions;

export default cartSlice.reducer;
