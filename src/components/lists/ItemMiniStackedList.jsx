import { useEffect, useState } from "react";

export default function ItemMiniStackedList({ person }) {
  const [activeCustomer, setActiveCustomer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (person && person.assists && person.assists.length > 0) {
      setActiveCustomer(person.assists[person.assists.length - 1].pay_month);
      setLoading(false);
    }
  }, [person]);
  return (
    <>
      <li
        className={`flex justify-between gap-x-6 py-2 px-4 cursor-pointer hover:shadow-inner hover:bg-gray-100`}
      >
        <div className="flex min-w-0 gap-x-4 items-center">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-4 text-gray-400 capitalize">
              {`${person.name} ${person.surname}`}
            </p>
          </div>
        </div>
        <div className="shrink-0 flex flex-row justify-between">
          <div className="pl-2 flex items-center">
            {loading ? (
              <span className="text-xs font-bold">...</span>
            ) : (
              <span
                className={`text-xs font-bold uppercase ${
                  activeCustomer ? "text-green-600" : "text-red-600"
                }`}
              >
                {activeCustomer ? "Activo" : "Pagar"}
              </span>
            )}
          </div>
        </div>
      </li>
    </>
  );
}
