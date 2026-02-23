import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// CART ITEM INTERFACE
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

// CART STATE INTERFACE
export interface CartState {
  items: CartItem[];
  total: number;
}

// INITIAL STATE
const initialState: CartState = {
  items: [],
  total: 0,
};

// CART SLICE DEF
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const existing = state.items.find((i) => i.productId === item.productId);

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }

      state.total += state.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
      state.total = state.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
    },

    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
