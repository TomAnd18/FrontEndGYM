// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "./customersSlice";

const store = configureStore({
  reducer: {
    customers: customersReducer,
  },
});

export default store;
