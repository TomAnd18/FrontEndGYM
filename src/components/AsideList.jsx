import { useSelector } from "react-redux";
import SearchPresentUsers from "./searches/SearchPresentUsers";
import MiniStackedList from "./lists/MiniStackedList";
import Spinner from "./spinners/Spinner";

export default function AsideList({
  addCustomersPresentTodayFiltered,
  loading,
  getCustomersPresentToday,
}) {
  const customers = useSelector((state) => state.customers.backupUsersToday);
  const allCustomers = useSelector((state) => state.customers.backupList);

  const filterInactive = () => {
    return allCustomers.filter(
      (item) => !item.assists[item.assists.length - 1].pay_month
    ).length;
  };
  const filterHombre = () => {
    return allCustomers.filter((item) => item.gender === "Hombre").length;
  };
  const filterMujer = () => {
    return allCustomers.filter((item) => item.gender === "Mujer").length;
  };

  return (
    <>
      <div className="p-4 bg-gray-100 shadow-md shadow-gray-300 rounded-lg xl:sticky xl:top-24 z-30">
        <div>
          <div className="w-full flex justify-center items-center mb-3 ">
            <span className="w-4 h-4">
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z" />
              </svg>
            </span>
            <p className="text-gray-500 text-md ml-1 font-bold">
              Información del día
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <span className="flex w-4 h-4">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="#6b7280"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
              </span>
              <p className="ml-1 font-semibold text-gray-500 text-sm">
                Asistencias
              </p>
            </div>
            <div className="flex justify-center items-center">
              {loading ? (
                <span className="block w-3 h-3 ml-2">
                  <Spinner />
                </span>
              ) : (
                <p className="ml-2 font-semibold text-gray-400">
                  {customers.length}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <div className="flex items-center">
              <span className="w-4 h-4">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  fill="#6b7280"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </span>
              <p className="ml-1 font-semibold text-gray-500 text-sm">Faltas</p>
            </div>
            <div className="flex items-center">
              {loading ? (
                <span className="block w-3 h-3 ml-2">
                  <Spinner />
                </span>
              ) : (
                <p className="ml-2 font-semibold text-gray-400">
                  {allCustomers.length - customers.length}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-auto py-4 xl:sticky xl:top-[13.5rem] z-30">
        <SearchPresentUsers
          addCustomersPresentTodayFiltered={addCustomersPresentTodayFiltered}
          getCustomersPresentToday={getCustomersPresentToday}
        />
      </div>
      <div className="w-auto xl:sticky xl:top-72">
        <MiniStackedList
          loading={loading}
          getCustomersPresentToday={getCustomersPresentToday}
        />
      </div>
    </>
  );
}
