import { useSelector } from "react-redux";
import ItemList from "./ItemList";

export default function StackedList({
  loading,
  scrollRefs,
  setCustomerPresentToday,
  deleteCustomerPresentToday,
  handleDeleteCustomer,
  handleUpdateCustomer,
  getActiveCustomer,
}) {
  const data = useSelector((state) => state.customers.list);

  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (data.length == 0)
    return (
      <p className="font-semibold w-full flex justify-center">
        No hay clientes registrados
      </p>
    );

  return (
    <ul role="list" className="list-none">
      {data.map((person, index) => {
        return (
          <li
            key={"item-person-" + index}
            className={`w-full flex flex-col xl:flex-row justify-between gap-x-6 py-2 px-4 hover:bg-gray-50 hover:shadow-inner hover:border-l-2 hover:border-l-blue-600 hover:border-r-2 hover:border-r-blue-600 ${
              index === data.length - 1 ? "" : "border-b"
            }`}
          >
            <ItemList
              person={person}
              index={index}
              scrollRefs={scrollRefs}
              setCustomerPresentToday={setCustomerPresentToday}
              deleteCustomerPresentToday={deleteCustomerPresentToday}
              handleDeleteCustomer={handleDeleteCustomer}
              handleUpdateCustomer={handleUpdateCustomer}
              getActiveCustomer={getActiveCustomer}
            />
          </li>
        );
      })}
    </ul>
  );
}
