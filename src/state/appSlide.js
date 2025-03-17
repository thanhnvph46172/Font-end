import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    cartItem: 0,
  },
  reducers: {
    setCartItem: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setCartItem } = appSlice.actions;

export default appSlice.reducer;
