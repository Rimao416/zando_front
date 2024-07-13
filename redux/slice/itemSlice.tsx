import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config/config";
import axios from "axios";

API.defaults.withCredentials = true;

interface ItemState {
  items: any[];
  page: number;
  status: string;
  error: null | string;
}
const initialState: ItemState = {
  items: [],
  page: 1,
  status: "idle",
  error: null,
};
export const getItems = createAsyncThunk<any>(
  "items/getItems",
  async (_, { rejectWithValue }) => {
    const response = await API.get("/api/v1/items");
    try {
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    resetItems: (state) => {
      state.items = [];
      state.page = 1;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...state.items, ...action.payload];
      })
      .addCase(getItems.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default itemSlice.reducer;
