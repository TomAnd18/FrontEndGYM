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

  return (
    <>
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="mb-8">
          <div className="w-full flex justify-center items-center mb-3 ">
            <span className="w-5 h-5">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M280 64l40 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l40 0 9.6 0C121 27.5 153.3 0 192 0s71 27.5 78.4 64l9.6 0zM64 112c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16l-16 0 0 24c0 13.3-10.7 24-24 24l-88 0-88 0c-13.3 0-24-10.7-24-24l0-24-16 0zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
              </svg>
            </span>
            <p className="text-gray-500 text-lg ml-1 font-semibold">
              Información general
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              {/* <span className="flex w-4 h-4">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="#16a34a"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
              </span> */}
              <p className="ml-1 font-semibold text-gray-500">
                Clientes Registrados
              </p>
            </div>
            <div className="flex justify-center items-center">
              <span className="w-5 h-5">
                <svg
                  className="w-5 h-5"
                  fill="#1e3050"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5l0 21.5c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112l32 0c24 0 46.2 7.5 64.4 20.3zM448 416l0-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176l32 0c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2l0 26.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3l0-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2l0 42.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112l32 0c61.9 0 112 50.1 112 112z" />
                </svg>
              </span>
              {loading ? (
                <span className="block w-3 h-3 ml-2">
                  <Spinner />
                </span>
              ) : (
                <p className="ml-2 font-semibold text-gray-500">
                  {allCustomers.length}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              {/* <span className="flex w-4 h-4">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="#16a34a"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
              </span> */}
              <p className="ml-1 font-semibold text-gray-500">
                Clientes Inactivos
              </p>
            </div>
            <div className="flex justify-center items-center">
              <span className="w-5 h-5">
                <svg
                  className="w-5 h-5"
                  fill="#1e3050"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5l0 21.5c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112l32 0c24 0 46.2 7.5 64.4 20.3zM448 416l0-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176l32 0c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2l0 26.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3l0-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2l0 42.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112l32 0c61.9 0 112 50.1 112 112z" />
                </svg>
              </span>
              {loading ? (
                <span className="block w-3 h-3 ml-2">
                  <Spinner />
                </span>
              ) : (
                <p className="ml-2 font-semibold text-gray-500">
                  {allCustomers.length}
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center items-center mb-3 ">
            <span className="w-5 h-5">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z" />
              </svg>
            </span>
            <p className="text-gray-500 text-lg ml-1 font-semibold">
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
                  fill="#16a34a"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
              </span>
              <p className="ml-1 font-semibold text-gray-500">Asistencias</p>
            </div>
            <div className="flex justify-center items-center">
              <span className="w-4 h-4">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  fill="#16a34a"
                >
                  <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z" />
                </svg>
              </span>
              {loading ? (
                <span className="block w-3 h-3 ml-2">
                  <Spinner />
                </span>
              ) : (
                <p className="ml-2 font-semibold text-gray-500">
                  {customers.length}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex items-center">
              <span className="w-4 h-4">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  fill="red"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </span>
              <p className="ml-1 font-semibold text-gray-500">Faltas</p>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  fill="#dc2626"
                >
                  <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z" />
                </svg>
              </span>
              {loading ? (
                <span className="block w-3 h-3 ml-2">
                  <Spinner />
                </span>
              ) : (
                <p className="ml-2 font-semibold text-gray-500">
                  {allCustomers.length - customers.length}
                </p>
              )}
            </div>
          </div>
        </div>
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
