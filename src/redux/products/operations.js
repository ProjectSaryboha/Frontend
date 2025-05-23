import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productInstance = axios.create({
  baseURL: "your_base_url",
});

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkApi) => {
    try {
      const data = await productInstance.get();

      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
