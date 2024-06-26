// src/redux/customersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers(state, action) {
      state.list = action.payload;
    },
    addCustomer(state, action) {
      state.list.push(action.payload);
    },
    removeCustomer(state, action) {
      state.list = state.list.filter(
        (customer) => customer.id !== action.payload
      );
    },
  },
});

export const { setCustomers, addCustomer, removeCustomer } =
  customersSlice.actions;

export default customersSlice.reducer;
