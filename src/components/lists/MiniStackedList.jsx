import { useSelector } from "react-redux";
import useCustomerHook from "../../hooks/useCustomerHook";

const people = [
  {
    name: "Leslie Alexander",
    gender: "mujer",
    role: "Standard",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Lindsay Walton",
    gender: "mujer",
    role: "Premium",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
];

export default function MiniStackedList() {
  const { loading } = useCustomerHook();
  const customers = useSelector((state) => state.customers.usersToday);

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
      {customers.map((person, index) => (
        <li
          key={"item-person-" + index}
          className={`flex justify-between gap-x-6 py-2 px-4 cursor-pointer ${
            person.active == "active"
              ? "hover:bg-gray-100"
              : "hover:bg-red-100 bg-red-50"
          }`}
        >
          <div className="flex min-w-0 gap-x-4 items-center">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-4 text-gray-400">
                {`${person.name} ${person.surname}`}
              </p>
            </div>
          </div>
          <div className="shrink-0 flex flex-row justify-between">
            <div className="pl-2 flex items-center">
              <span
                className={`text-xs font-bold uppercase ${
                  person.active == "active" ? "text-green-500" : "text-red-500"
                }`}
              >
                {person.active == "active" ? "Activo" : "Pagar"}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
