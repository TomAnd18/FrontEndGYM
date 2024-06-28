import Dropdown from "./Dropdown";
import useCustomerHook from "../hooks/useCustomerHook";
import { useSelector } from "react-redux";
import CheckBoxGroup from "./CheckBoxGroup";

export default function StackedList() {
  const { loading, scrollRefs } = useCustomerHook();
  const data = useSelector((state) => state.customers.list);

  if (loading) return <p>Cargando...</p>;
  if (data.length == 0) return <p>No hay usuarios</p>;

  const scrollLeft = (index) => {
    if (scrollRefs[index].current) {
      scrollRefs[index].current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = (index) => {
    if (scrollRefs[index].current) {
      scrollRefs[index].current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {data.map((person, index) => {
        return (
          <li
            key={"item-person-" + index}
            className="w-full flex flex-col xl:flex-row justify-between gap-x-6 py-2 hover:bg-gray-50"
          >
            <div className="w-auto flex min-w-0 gap-x-4 items-center">
              <div className="h-7 w-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="#9ca3c0"
                >
                  <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                </svg>
              </div>
              <div className="min-w-0 flex-auto">
                <div className="text-md font-semibold leading-3 text-gray-700 flex items-center">
                  <p className="mr-1 capitalize">{person.name}</p>
                  <p className="capitalize">{person.surname}</p>
                  {person.active == "active" ? (
                    <span className="text-xxs px-2 py-0.5 bg-green-500 text-white ml-2 rounded-full uppercase">
                      Activo
                    </span>
                  ) : (
                    <span className="text-xxs px-3 py-1 bg-red-500 text-white ml-2 rounded-full uppercase">
                      Pago Vencido
                    </span>
                  )}
                </div>
                <p className="mt-1 truncate text-xs leading-3 text-gray-500">
                  {person.gender}
                </p>
              </div>
            </div>
            <div className="shrink-0 flex flex-row justify-between xl:justify-end mt-2 xl:mt-0 w-full xl:w-7/12">
              <div className="w-2/3 flex justify-center flex-col pr-2">
                <div className="w-full relative flex pl-2 pr-3 overflow-hidden">
                  <button
                    onClick={() => scrollLeft(index)}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full"
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="#9ca3b7"
                    >
                      <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L376 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-182.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L119 273c-9.4-9.4-9.4-24.6 0-33.9L231 127z" />
                    </svg>
                  </button>
                  <div
                    ref={scrollRefs[index]}
                    style={{ scrollBehavior: "smooth" }}
                    className="mx-5 py-1 flex overflow-x-hidden overflow-y-hidden"
                  >
                    <CheckBoxGroup />
                  </div>
                  <button
                    onClick={() => scrollRight(index)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full"
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="#9ca3b7"
                    >
                      <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="pl-2 flex items-center w-auto">
                <Dropdown
                  idCustomer={person.id}
                  nameCustomer={`${person.name} ${person.surname}`}
                  person={person}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
