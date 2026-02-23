import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { OrderState } from "../../types/OrderState";

const initialState: OrderState = {
  currentOrder: null,
  loading: false,
  error: null,
};

// CREATE ORDER
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (data: { items: string[]; total: number }, thunkAPI) => {
    try {
      const response = await axios.post("/orders", data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.message || "Order creation failed",
      );
    }
  },
);

// CREATE PAYMENT INTENT
export const createPaymentIntent = createAsyncThunk(
  "orders/createPaymentIntent",
  async (orderId: string, thunkAPI) => {
    try {
      const response = await axios.post("/payments/create-intent", { orderId });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.message || "Payment Intent creation failed",
      );
    }
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrder(state) {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // CREATE ORDER CASES
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // CREATE PAYMENT INTENT
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;

        if (state.currentOrder) {
          state.currentOrder.paymentIntentId = action.payload.paymentIntentId;
        }
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
