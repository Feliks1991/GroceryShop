import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalType = "login" | "register" | null;

type ModalState = {
  isOpen: boolean;
  type: ModalType;
};

const initialState: ModalState = {
  isOpen: false,
  type: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.isOpen = true;
      state.type = action.payload;
    },
    close: (state) => {
      state.isOpen = false;
      state.type = null;
    },
    switchType: (state, action: PayloadAction<ModalType>) => {
      state.type = action.payload;
    },
  },
});

export const { openModal, close, switchType } = modalSlice.actions;
export default modalSlice.reducer;
