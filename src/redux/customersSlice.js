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
    putCustomer(state, action) {
      const index = state.list.findIndex(
        (customer) => customer.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { setCustomers, addCustomer, removeCustomer, putCustomer } =
  customersSlice.actions;

export default customersSlice.reducer;
