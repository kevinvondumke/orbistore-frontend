import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.service";
import cartReducer from "../features/cart/cart.service";
import orderReducer from "../features/orders/order.service";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

// ROOT STATE / APP DISPATCH TYPES (REVOLT)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
