import { useSelector } from "react-redux";
import { useEffect } from "react";
import ItemMiniStackedList from "./ItemMiniStackedList";
import Spinner from "../spinners/Spinner";

export default function MiniStackedList({ loading, getCustomersPresentToday }) {
  const customers = useSelector((state) => state.customers.usersToday);

  useEffect(() => {
    getCustomersPresentToday();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center">
        <p>Obteniendo asistencias</p>
        <span className="block w-4 h-4 ml-2">
          <Spinner />
        </span>
      </div>
    );
  }

  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 py-2 rounded-lg bg-gray-50 shadow-md"
    >
      {customers.length === 0 ? (
        <div className="flex w-full justify-center items-center py-8">
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
