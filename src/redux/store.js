import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../redux/products/slice";

const store = configureStore({
  reducer: {
    data: productReducer,
  },
});

export default store;
