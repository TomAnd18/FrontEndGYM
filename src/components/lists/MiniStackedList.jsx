import { useSelector } from "react-redux";
import useCustomerHook from "../../hooks/useCustomerHook";
import { useEffect } from "react";

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
          <li
            key={"item-person-" + index}
            className={`flex justify-between gap-x-6 py-2 px-4 cursor-pointer hover:shadow-inner ${
              person.active == "active"
                ? "hover:bg-gray-100"
                : "hover:bg-red-100 bg-red-50"
            }`}
          >
            <div className="flex min-w-0 gap-x-4 items-center">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-4 text-gray-400 capitalize">
                  {`${person.name} ${person.surname}`}
                </p>
              </div>
            </div>
            <div className="shrink-0 flex flex-row justify-between">
              <div className="pl-2 flex items-center">
                <span
                  className={`text-xs font-bold uppercase ${
                    person.active == "active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {person.active == "active" ? "Activo" : "Pagar"}
                </span>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
