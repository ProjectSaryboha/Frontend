import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./operations";

const INITIAL_STATE = {
  items: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const productReducer = productSlice.reducer;
