import { API } from "@/config/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

API.defaults.withCredentials = true;
interface AuthState {
  user: null | {
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
    };
    phoneNumber: string;
    email: string;
    dateOfBirth: string;
    firstName: string;
    lastName: string;
    gender: string;
    password: string;
    confirmPassword: string;
  };
  status: string;
  error: null | string;
}
const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};
export const sign = createAsyncThunk<any, any>(
  "auth/sign",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post("/api/v1/auth/login", data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sign.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sign.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(sign.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export default authSlice.reducer;

export const { resetAuth } = authSlice.actions;
