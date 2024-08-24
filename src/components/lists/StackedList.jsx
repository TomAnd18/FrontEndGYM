import { useSelector } from "react-redux";
import ItemList from "./ItemList";
import Spinner from "../spinners/Spinner";
import { useEffect, useState } from "react";

export default function StackedList({
  loading,
  scrollRefs,
  setCustomerPresentToday,
  deleteCustomerPresentToday,
  handleDeleteCustomer,
  handleUpdateCustomer,
  updateStatePayMonthCustomer,
  getDateCreationCustomer,
}) {
  const order = localStorage.getItem("order");
  const data = useSelector((state) => state.customers.list);
  const [dataC, setDataC] = useState([]);

  useEffect(() => {
    let sortedData = [...data];
    if (order === "nameAZ") {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (order === "nameZA") {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (order === "surnameAZ") {
      sortedData.sort((a, b) => a.surname.localeCompare(b.surname));
    }
    if (order === "surnameZA") {
      sortedData.sort((a, b) => b.surname.localeCompare(a.surname));
    }

    setDataC(sortedData);
  }, [order, data]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center">
        <p>Cargando</p>
        <span className="block w-4 h-4 ml-2">
          <Spinner />
        </span>
      </div>
    );
  }

  if (data.length == 0)
    return (
      <div className="flex w-full justify-center items-center">
        <span className="w-5 h-5">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="#FFD43B"
              d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
            />
          </svg>
        </span>
        <p className="font-semibold ml-2">No hay registros</p>
      </div>
    );

  return (
    <ul role="list" className="list-none">
      {!loading &&
        dataC.map((person, index) => {
          return (
            <ItemList
              key={`stacked-list${index}`}
              person={person}
              index={index}
              scrollRefs={scrollRefs}
              setCustomerPresentToday={setCustomerPresentToday}
              deleteCustomerPresentToday={deleteCustomerPresentToday}
              handleDeleteCustomer={handleDeleteCustomer}
              handleUpdateCustomer={handleUpdateCustomer}
              updateStatePayMonthCustomer={updateStatePayMonthCustomer}
              getDateCreationCustomer={getDateCreationCustomer}
            />
          );
        })}
    </ul>
  );
}
