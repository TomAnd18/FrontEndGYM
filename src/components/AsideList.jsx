import { useSelector } from "react-redux";
import SearchPresentUsers from "./searches/SearchPresentUsers";
import MiniStackedList from "./lists/MiniStackedList";

export default function AsideList({
  addCustomersPresentTodayFiltered,
  loading,
  getCustomersPresentToday,
}) {
  const customers = useSelector((state) => state.customers.backupUsersToday);
  const allCustomers = useSelector((state) => state.customers.list);
  return (
    <>
      <div className="text-gray-500 mb-4 p-4 uppercase bg-gray-50 rounded-lg">
        <p className="w-full flex justify-center mb-3 font-semibold">
          <b>Información del día</b>
        </p>
        <p className="text-sm">
          <b>Hoy asistieron:</b> {`${customers.length} clientes`}
        </p>
        <p className="text-sm">
          <b>Hoy faltaron:</b>{" "}
          {`${allCustomers.length - customers.length} clientes`}
        </p>
      </div>
      <div className="w-auto mb-4">
        <SearchPresentUsers
          addCustomersPresentTodayFiltered={addCustomersPresentTodayFiltered}
          getCustomersPresentToday={getCustomersPresentToday}
        />
      </div>
      <div className="w-auto">
        <MiniStackedList
          loading={loading}
          getCustomersPresentToday={getCustomersPresentToday}
        />
      </div>
    </>
  );
}
