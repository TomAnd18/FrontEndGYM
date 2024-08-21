"use client";

import { useEffect, useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";

export default function SelectOrder({
  saveSortCustomers,
  rechargeCustomersDefault,
}) {
  const data = useSelector((state) => state.customers.list);
  const order = localStorage.getItem("order");
  const [orderCustomers, setOrderCustomers] = useState(order);

  const customersList = Object.keys(data).map((key) => {
    return { id: key, ...data[key] };
  });

  const customersDefault = () => {
    setOrderCustomers("default");
    rechargeCustomersDefault();
  };

  const sortCustomersNameAZ = () => {
    setOrderCustomers("nameAZ");

    customersList.sort((a, b) => a.name.localeCompare(b.name));

    //envio los clientes ya ordenados
    saveSortCustomers(customersList);
  };

  const sortCustomersNameZA = () => {
    setOrderCustomers("nameZA");

    customersList.sort((a, b) => b.name.localeCompare(a.name));

    //envio los clientes ya ordenados
    saveSortCustomers(customersList);
  };

  const sortCustomersSurnameAZ = () => {
    setOrderCustomers("surnameAZ");

    customersList.sort((a, b) => a.surname.localeCompare(b.surname));

    //envio los clientes ya ordenados
    saveSortCustomers(customersList);
  };

  const sortCustomersSurnameZA = () => {
    setOrderCustomers("surnameZA");

    customersList.sort((a, b) => b.surname.localeCompare(a.surname));

    //envio los clientes ya ordenados
    saveSortCustomers(customersList);
  };

  const people = [
    {
      id: 1,
      name: "Odernar",
      onClickAction: sortCustomersNameAZ,
    },
    {
      id: 2,
      name: "Predeterminado",
      onClickAction: customersDefault,
    },
    {
      id: 3,
      name: "Nombre A-Z",
      onClickAction: sortCustomersNameAZ,
    },
    {
      id: 4,
      name: "Nombre Z-A",
      onClickAction: sortCustomersNameZA,
    },
    {
      id: 5,
      name: "Apellido A-Z",
      onClickAction: sortCustomersSurnameAZ,
    },
    {
      id: 6,
      name: "Apellido Z-A",
      onClickAction: sortCustomersSurnameZA,
    },
  ];

  const selectedOrder = () => {
    if (order === "nameAZ") {
      return people[2];
    }
    if (order === "nameZA") {
      return people[3];
    }
    if (order === "surnameAZ") {
      return people[4];
    }
    if (order === "surnameZA") {
      return people[5];
    }
    return people[1];
  };

  const [selected, setSelected] = useState(selectedOrder);

  useEffect(() => {
    localStorage.setItem("order", orderCustomers);
  }, [orderCustomers, order, selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {/* <Label className="block text-sm font-medium leading-6 text-gray-900">
        Assigned to
      </Label> */}
      <div className="relative inline-block ml-0 lg:ml-4 w-44">
        <ListboxButton className="relative w-full h-full cursor-default rounded-full bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6">
          <span className="flex items-center">
            {/* <img
              alt=""
              src={selected.avatar}
              className="h-5 w-5 flex-shrink-0 rounded-full"
            /> */}
            <span className="ml-3 block truncate">{people[0].name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {people.map((person, index) =>
            index == 0 ? (
              ""
            ) : (
              <ListboxOption
                key={person.id}
                value={person}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white"
                onClick={person.onClickAction}
              >
                <div className="flex items-center">
                  <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                    {person.name}
                  </span>
                </div>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </ListboxOption>
            )
          )}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
