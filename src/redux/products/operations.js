import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productInstance = axios.create({
  baseURL: "http://192.168.0.107:5000",
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkApi) => {
    try {
      const response = await productInstance.get("/top-products");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, thunkApi) => {
    try {
      const response = await productInstance.get("/category-prices");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchCounts = createAsyncThunk(
  "products/fetchCounts",
  async (_, thunkApi) => {
    try {
      const response = await productInstance.get("/product-counts");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (_, thunkApi) => {
    try {
      const response = await productInstance.get(
        "products-by-category?category=Овочі та фрукти"
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
