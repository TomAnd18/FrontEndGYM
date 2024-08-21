import { useEffect, useState } from "react";
import CheckBoxGroup from "../CheckBoxGroup";
import Dropdown from "../dropdowns/Dropdown";
import Spinner from "../spinners/Spinner";

export default function ItemList({
  person,
  index,
  scrollRefs,
  setCustomerPresentToday,
  deleteCustomerPresentToday,
  handleDeleteCustomer,
  handleUpdateCustomer,
  updateStatePayMonthCustomer,
  getDateCreationCustomer,
}) {
  const [activeCustomer, setActiveCustomer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (person && person.assists && person.assists.length > 0) {
      setActiveCustomer(person.assists[person.assists.length - 1].pay_month);
      setLoading(false);
    }
  }, [person]);

  return (
    <>
      <li
        key={"item-person-" + index}
        className={`w-full flex flex-col xl:flex-row justify-between gap-x-6 py-2 px-4 hover:bg-gray-100 hover:shadow-md xl:hover:rounded-full`}
      >
        <div className="w-auto flex min-w-0 gap-x-4 items-center">
          <div className="h-7 w-7 rounded-full bg-gray-200 flex justify-center items-center">
            <p className="text-gray-500 font-bold text-sm">{`${person.id}`}</p>
          </div>
          <div className="min-w-0 flex-auto">
            <div className="text-md font-semibold leading-3 flex items-center">
              {person.gender == "Hombre" ? (
                <span className="w-3.5 h-3.5 mr-1">
                  <svg
                    className="w-3.5 h-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    fill="#1e3050"
                  >
                    <path d="M289.8 46.8c3.7-9 12.5-14.8 22.2-14.8l112 0c13.3 0 24 10.7 24 24l0 112c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L321 204.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176S0 401.2 0 304s78.8-176 176-176c37 0 71.4 11.4 99.8 31l52.6-52.6L295 73c-6.9-6.9-8.9-17.2-5.2-26.2zM400 80s0 0 0 0s0 0 0 0s0 0 0 0zM176 416a112 112 0 1 0 0-224 112 112 0 1 0 0 224z" />
                  </svg>
                </span>
              ) : (
                <span className="w-3.5 h-3.5 mr-1">
                  <svg
                    className="w-3.5 h-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    fill="#1e3050"
                  >
                    <path d="M80 176a112 112 0 1 1 224 0A112 112 0 1 1 80 176zM224 349.1c81.9-15 144-86.8 144-173.1C368 78.8 289.2 0 192 0S16 78.8 16 176c0 86.3 62.1 158.1 144 173.1l0 34.9-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-34.9z" />
                  </svg>
                </span>
              )}
              <div className="flex text-gray-600">
                <p className="mr-1 capitalize">{person.name}</p>
                <p className="capitalize">{person.surname}</p>
              </div>
              {loading ? (
                <span className="w-3 h-3 ml-5">
                  <Spinner />
                </span>
              ) : (
                <span
                  className={`text-xxs px-2 py-0.5 ${
                    activeCustomer ? "bg-green-600" : "bg-red-600"
                  } text-white ml-2 rounded-full uppercase`}
                >
                  {activeCustomer ? "Activo" : "Pagar"}
                </span>
              )}
            </div>
            <p className="mt-1 truncate text-xs leading-3 text-gray-500">
              {person.subscription}
            </p>
          </div>
        </div>
        <div className="shrink-0 flex flex-row justify-between xl:justify-end mt-2 xl:mt-0 w-full xl:w-7/12">
          <div className="w-2/3 flex justify-center flex-col pr-2">
            <div className="w-full relative flex pl-2 pr-3 overflow-hidden">
              <CheckBoxGroup
                person={person}
                setCustomerPresentToday={setCustomerPresentToday}
                deleteCustomerPresentToday={deleteCustomerPresentToday}
                scrollRefs={scrollRefs}
                index={index}
              />
            </div>
          </div>
          <div className="pl-2 flex items-center w-auto">
            <Dropdown
              idCustomer={person.id}
              nameCustomer={`${person.name} ${person.surname}`}
              person={person}
              handleDeleteCustomer={handleDeleteCustomer}
              handleUpdateCustomer={handleUpdateCustomer}
              updateStatePayMonthCustomer={updateStatePayMonthCustomer}
              getDateCreationCustomer={getDateCreationCustomer}
            />
          </div>
        </div>
      </li>
    </>
  );
}
