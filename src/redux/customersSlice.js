import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  usersToday: [],
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
    setUsersToday(state, action) {
      // Nuevo reducer para establecer la lista de usuarios
      state.usersToday = action.payload;
    },
    addUserToday(state, action) {
      // Nuevo reducer para añadir un usuario a la lista
      state.usersToday.push(action.payload);
    },
    removeUserToday(state, action) {
      // Nuevo reducer para eliminar un usuario de la lista
      state.usersToday = state.usersToday.filter(
        (user) => user.id !== action.payload
      );
    },
  },
});

export const {
  setCustomers,
  addCustomer,
  removeCustomer,
  putCustomer,
  setUsersToday,
  addUserToday,
  removeUserToday,
} = customersSlice.actions;

export default customersSlice.reducer;
