import Dropdown from "../components/Dropdown";
import useCustomerHook from "../hooks/useCustomerHook";
import { useSelector } from "react-redux";

export default function Example() {
  const { loading } = useCustomerHook();
  const imageUrl =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
  const data = useSelector((state) => state.customers.list);

  if (loading) return <p>Cargando...</p>;

  if (data.length == 0) return <p>No hay usuarios</p>;

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {data.map((person, index) => (
        <li
          key={"item-person-" + index}
          className="flex justify-between gap-x-6 py-2"
        >
          <div className="flex min-w-0 gap-x-4 items-center">
            <img
              className="h-8 w-8 flex-none rounded-full bg-gray-50"
              src={imageUrl}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <div>
                <p className="text-md font-semibold leading-4 text-gray-900">
                  <span className="mr-1">{person.name}</span>
                  <span>{person.surname}</span>
                </p>
              </div>
              <p className="mt-1 truncate text-xs leading-3 text-gray-500">
                {person.gender}
              </p>
            </div>
          </div>
          <div className="shrink-0 flex flex-row justify-between">
            <div className="flex justify-center flex-col pr-2">
              <div className="flex border border-gray-300 rounded-full px-2">
                <div className="relative flex gap-x-3 mx-1">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                </div>
                <div className="relative flex gap-x-3 mx-1">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                </div>
                <div className="relative flex gap-x-3 mx-1">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                </div>
                <div className="relative flex gap-x-3 mx-1">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pl-2 flex items-center">
              <Dropdown idCustomer={person.id} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
