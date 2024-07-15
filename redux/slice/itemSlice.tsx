import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config/config";
import axios from "axios";

API.defaults.withCredentials = true;

interface ItemState {
  items: any[];
  page: number;
  status: string;
  error: null | string;
  totalItems: number;
}
const initialState: ItemState = {
  items: [],
  page: 1,
  status: "idle",
  error: null,
  totalItems: 0,
};

export const getItems = createAsyncThunk<any, number>(
  "items/getItems",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await API.get(`/api/v1/items?page=${page}`);
      return response.data;
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
        state.items = [...state.items, ...action.payload.data];
        // state.page += 1;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(getItems.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default itemSlice.reducer;
