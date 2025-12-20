import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterSlice = {
  priceRange: number[];
  allowedBrands: string[];
};

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    priceRange: [],
    allowedBrands: [],
  } as FilterSlice,
  reducers: {
    selectPrice: (state, action: PayloadAction<number[]>) => {
      state.priceRange = action.payload;
    },
    selectBrands: (state, action: PayloadAction<string[]>) => {
      state.allowedBrands = action.payload;
    },
  },
});

export const { selectPrice, selectBrands } = filterSlice.actions;

export default filterSlice.reducer;
