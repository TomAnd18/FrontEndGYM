import { useSelector } from "react-redux";
import SearchUserStackedList from "./SearchUserStackedList";
import MiniStackedList from "./lists/MiniStackedList";

export default function AsideList() {
  const customers = useSelector((state) => state.customers.usersToday);
  const allCustomers = useSelector((state) => state.customers.list);
  return (
    <>
      <div className="text-sm text-gray-500 mb-4 p-4 font-semibold uppercase bg-gray-50 rounded-lg">
        <p className="w-full flex justify-center mb-3">
          <b>Información del día</b>
        </p>
        <p>
          <b>Asistencias:</b> {`${customers.length} el día de hoy`}
        </p>
        <p>
          <b>Faltas:</b>{" "}
          {`${allCustomers.length - customers.length} el día de hoy`}
        </p>
      </div>
      <div className="w-auto mb-4">
        <SearchUserStackedList />
      </div>
      <div className="w-auto">
        <MiniStackedList />
      </div>
    </>
  );
}
