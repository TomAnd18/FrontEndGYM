import { useSelector } from "react-redux";
import ItemList from "./ItemList";

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
