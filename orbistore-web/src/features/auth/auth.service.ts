import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AuthState } from "../../types/AuthState";

// INITIAL STATE
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// LOGIN ACTION THUNK
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", credentials);
      return res.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.message || "Login failed",
      );
    }
  },
);

// SIGN UP ACTION THUNK
export const signup = createAsyncThunk(
  "auth/signup",
  async (data: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post("/auth/signup", data);
      return res.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.message || "Sign up failed",
      );
    }
  },
);

// AUTH SLICE DEF
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // LOGOUT ACTION
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // SIGN IN CASE
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // SIGN UP CASE
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
