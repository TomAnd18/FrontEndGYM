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

export default function SelectFilter({ saveFilterCustomers }) {
  const data = useSelector((state) => state.customers.backupList);
  const filter = localStorage.getItem("filter");
  const [filterCustomers, setFilterCustomers] = useState(filter);
  const filteredData = data;

  const handleFilterAll = () => {
    setFilterCustomers("all");

    //envio los clientes ya filtrados
    saveFilterCustomers(filteredData);
  };

  const handleFilterActive = () => {
    setFilterCustomers("active");

    const filteredData = data.filter(
      (item) => item.assists[item.assists.length - 1].pay_month
    );

    //envio los clientes ya filtrados
    saveFilterCustomers(filteredData);
  };

  const handleFilterInactive = () => {
    setFilterCustomers("inactive");

    const filteredData = data.filter(
      (item) => !item.assists[item.assists.length - 1].pay_month
    );

    //envio los clientes ya filtrados
    saveFilterCustomers(filteredData);
  };

  const handleFilterHombre = () => {
    setFilterCustomers("hombre");

    const filteredData = data.filter((item) => item.gender === "Hombre");

    //envio los clientes ya filtrados
    saveFilterCustomers(filteredData);
  };

  const handleFilterMujer = () => {
    setFilterCustomers("mujer");

    const filteredData = data.filter((item) => item.gender === "Mujer");

    //envio los clientes ya filtrados
    saveFilterCustomers(filteredData);
  };

  const handleFilterPremium = () => {
    setFilterCustomers("premium");

    const filteredData = data.filter((item) => item.subscription === "Premium");

    //envio los clientes ya filtrados
    saveFilterCustomers(filteredData);
  };

  const handleFilterStandard = () => {
    setFilterCustomers("standard");

    const filteredData = data.filter(
      (item) => item.subscription === "Standard"
    );

    //envio los clientes ya filtrados
    saveFilterCustomers(filteredData);
  };

  const people = [
    {
      id: 1,
      name: "Filtrar",
      onclickEvent: handleFilterAll,
    },
    {
      id: 2,
      name: "Todos",
      onclickEvent: handleFilterAll,
    },
    {
      id: 3,
      name: "Activos",
      onclickEvent: handleFilterActive,
    },
    {
      id: 4,
      name: "Inactivos",
      onclickEvent: handleFilterInactive,
    },
    {
      id: 5,
      name: "Hombres",
      onclickEvent: handleFilterHombre,
    },
    {
      id: 6,
      name: "Mujeres",
      onclickEvent: handleFilterMujer,
    },
    {
      id: 7,
      name: "Premium",
      onclickEvent: handleFilterPremium,
    },
    {
      id: 8,
      name: "Standard",
      onclickEvent: handleFilterStandard,
    },
  ];
  const selectedFilter = () => {
    if (filter === "active") {
      return people[2];
    }
    if (filter === "inactive") {
      return people[3];
    }
    if (filter === "hombre") {
      return people[4];
    }
    if (filter === "mujer") {
      return people[5];
    }
    if (filter === "premium") {
      return people[6];
    }
    if (filter === "standard") {
      return people[7];
    }
    return people[1];
  };

  const [selected, setSelected] = useState(people[1]);

  useEffect(() => {
    console.log(selected);

    localStorage.setItem("filter", filterCustomers);
  }, [filterCustomers, filter, selected]);

  // const [selected, setSelected] = useState(people[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {/* <Label className="block text-sm font-medium leading-6 text-gray-900">
        Assigned to
      </Label> */}
      <div className="relative ml-4 w-32">
        <ListboxButton className="relative w-full h-full cursor-default rounded-full bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6">
          <span className="flex items-center">
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
          className="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {people.map((person, index) =>
            index == 0 ? (
              ""
            ) : (
              <ListboxOption
                key={person.id}
                value={person}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white"
                onClick={person.onclickEvent}
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
