import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function SearchUserStackedList({
  addCustomersPresentTodayFiltered,
  getCustomersPresentToday,
}) {
  const [searchInput, setSearchInput] = useState("");
  const backupUsersToday = useSelector(
    (state) => state.customers.backupUsersToday
  );

  const handleChange = (e) => {
    const busqueda = e.target.value;

    setSearchInput(busqueda);

    if (busqueda.trim() !== "") {
      const { firstName: name, lastName: surname } = splitSearchInput(busqueda);

      const filteredCustomers = filterCustomer(name, surname);

      addCustomersPresentTodayFiltered(filteredCustomers);
    } else {
      getCustomersPresentToday();
    }
  };

  const filterCustomer = (name, surname) => {
    const lowercasedInputName = name.toLowerCase();
    const lowercasedInputSurname = surname?.toLowerCase();

    return backupUsersToday.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(lowercasedInputName) ||
        customer.name.toLowerCase().includes(lowercasedInputSurname) ||
        customer.surname.toLowerCase().includes(lowercasedInputName) ||
        customer.surname.toLowerCase().includes(lowercasedInputSurname)
      );
    });
  };

  const splitSearchInput = (busqueda) => {
    // Trim para eliminar espacios en blanco al inicio y al final
    const trimmedInput = busqueda.trim();

    // Utiliza el método split para separar la cadena en el primer espacio
    const [firstName, lastName] = trimmedInput.split(" ", 2);

    if (!lastName) {
      return { firstName };
    }

    return { firstName, lastName };
  };

  return (
    <>
      <div className="relative">
        <div className="absolute flex items-center pl-4 top-0 bottom-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="w-5 h-5"
          >
            <path d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"></path>
          </svg>
        </div>
        <input
          id="search-presentusers"
          name="search"
          className="block w-full pl-12 rounded-md"
          placeholder="Buscar cliente"
          type="search"
          value={searchInput}
          onChange={handleChange}
        ></input>
      </div>
    </>
  );
}
