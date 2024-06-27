import Dropdown from "./Dropdown";
import useCustomerHook from "../hooks/useCustomerHook";
import { useSelector } from "react-redux";
import CheckBoxGroup from "./CheckBoxGroup";

export default function StackedList() {
  const { loading, scrollRefs } = useCustomerHook();
  const imageUrl =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
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
              <img
                className="h-8 w-8 flex-none rounded-full bg-gray-50"
                src={imageUrl}
                alt=""
              />
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
                <div className="w-full relative flex rounded-full pl-2 pr-3 overflow-hidden">
                  <button
                    onClick={() => scrollLeft(index)}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 px-2 py-1 hover:bg-gray-200"
                  >
                    {"<"}
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
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 px-2 py-1 hover:bg-gray-200"
                  >
                    {">"}
                  </button>
                </div>
              </div>
              <div className="pl-2 flex items-center w-auto">
                <Dropdown
                  idCustomer={person.id}
                  nameCustomer={`${person.name} ${person.surname}`}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
