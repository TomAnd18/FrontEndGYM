import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  backupList: [],
  usersToday: [],
  backupUsersToday: [],
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers(state, action) {
      state.list = action.payload;
      state.backupList = action.payload;
    },
    addCustomer(state, action) {
      state.list.push(action.payload);
      state.backupList.push(action.payload);
    },
    addCustomerSortNameAZ(state, action) {
      // Agregar el nuevo cliente a la lista y ordenarla alfabéticamente de menor a mayor
      const newList = [...state.list, action.payload];
      newList.sort((a, b) => a.name.localeCompare(b.name));
      state.list = newList;

      const newBackupList = [...state.backupList, action.payload];
      newBackupList.sort((a, b) => a.name.localeCompare(b.name));
      state.backupList = newBackupList;
    },
    addCustomerSortNameZA(state, action) {
      // Agregar el nuevo cliente a la lista y ordenarla alfabéticamente de mayor a menor
      const newList = [...state.list, action.payload];
      newList.sort((a, b) => b.name.localeCompare(a.name));
      state.list = newList;

      const newBackupList = [...state.backupList, action.payload];
      newBackupList.sort((a, b) => b.name.localeCompare(a.name));
      state.backupList = newBackupList;
    },
    addCustomerSortSurnameAZ(state, action) {
      // Agregar el nuevo cliente a la lista y ordenarla por surname de menor a mayor
      const newList = [...state.list, action.payload];
      newList.sort((a, b) => a.surname.localeCompare(b.surname));
      state.list = newList;

      const newBackupList = [...state.backupList, action.payload];
      newBackupList.sort((a, b) => a.surname.localeCompare(b.surname));
      state.backupList = newBackupList;
    },
    addCustomerSortSurnameZA(state, action) {
      // Agregar el nuevo cliente a la lista y ordenarla por surname de mayor a menor
      const newList = [...state.list, action.payload];
      newList.sort((a, b) => b.surname.localeCompare(a.surname));
      state.list = newList;

      const newBackupList = [...state.backupList, action.payload];
      newBackupList.sort((a, b) => b.surname.localeCompare(a.surname));
      state.backupList = newBackupList;
    },
    removeCustomer(state, action) {
      state.list = state.list.filter(
        (customer) => customer.id !== action.payload
      );
      state.backupList = state.backupList.filter(
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
      const index2 = state.backupList.findIndex(
        (customer) => customer.id === action.payload.id
      );
      if (index2 !== -1) {
        state.backupList[index2] = action.payload;
      }
    },
    clearAllCustomers(state) {
      state.items = [];
    },
    setCustomersSort(state, action) {
      state.list = action.payload;
    },
    setUsersToday(state, action) {
      //Nuevo reducer para establecer la lista de usuarios
      state.usersToday = action.payload;
      state.backupUsersToday = action.payload;
    },
    addUserToday(state, action) {
      //Nuevo reducer para añadir un usuario a la lista
      state.usersToday.push(action.payload);
      state.backupUsersToday.push(action.payload);
    },
    removeUserToday(state, action) {
      //Nuevo reducer para eliminar un usuario de la lista
      state.usersToday = state.usersToday.filter(
        (user) => user.id !== action.payload
      );
      state.backupUsersToday = state.backupUsersToday.filter(
        (user) => user.id !== action.payload
      );
    },
    updateUserToday(state, action) {
      //Nuevo reducer para actualizar un usuario en la lista
      const index = state.usersToday.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.usersToday[index] = action.payload;
      }
      const index2 = state.backupUsersToday.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index2 !== -1) {
        state.backupUsersToday[index2] = action.payload;
      }
    },
    setFilteredCustomers(state, action) {
      state.list = action.payload;
    },
    setFilteredPresentCustomers(state, action) {
      state.usersToday = action.payload;
    },
  },
});

export const {
  setCustomers,
  addCustomer,
  addCustomerSortNameAZ,
  addCustomerSortNameZA,
  addCustomerSortSurnameAZ,
  addCustomerSortSurnameZA,
  removeCustomer,
  putCustomer,
  clearAllCustomers,
  setCustomersSort,
  setUsersToday,
  addUserToday,
  removeUserToday,
  updateUserToday,
  setFilteredCustomers,
  setFilteredPresentCustomers,
} = customersSlice.actions;

export default customersSlice.reducer;
