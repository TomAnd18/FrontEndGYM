import { useSelector } from "react-redux";
import SearchUserStackedList from "./searches/SearchUserStackedList";
import MiniStackedList from "./lists/MiniStackedList";

export default function AsideList({
  addCustomersFiltered,
  rechargeCustomers,
  loading,
  getCustomersPresentToday,
}) {
  const customers = useSelector((state) => state.customers.usersToday);
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
        <SearchUserStackedList
          search={"customers-present"}
          addCustomersFiltered={addCustomersFiltered}
          rechargeCustomers={rechargeCustomers}
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
