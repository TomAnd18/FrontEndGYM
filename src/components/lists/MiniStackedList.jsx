import { useSelector } from "react-redux";
import { useEffect } from "react";
import ItemMiniStackedList from "./ItemMiniStackedList";

export default function MiniStackedList({ loading, getCustomersPresentToday }) {
  const customers = useSelector((state) => state.customers.usersToday);

  useEffect(() => {
    getCustomersPresentToday();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <p>Obteniendo asistencias...</p>
      </div>
    );
  }

  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 py-2 rounded-lg bg-gray-50 shadow-md"
    >
      {customers.length === 0 ? (
        <div className="w-full flex justify-center font-semibold py-8">
          No hay registros
        </div>
      ) : (
        customers.map((person, index) => (
          <ItemMiniStackedList
            key={"item-miniperson-" + index}
            person={person}
          />
        ))
      )}
    </ul>
  );
}
