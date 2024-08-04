import { useEffect, useState } from "react";
import Spinner from "../spinners/Spinner";

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
          <div className="min-w-0 flex items-center">
            {person.gender == "Hombre" ? (
              <span className="w-3 h-3 mr-1">
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="#9ca3af"
                >
                  <path d="M289.8 46.8c3.7-9 12.5-14.8 22.2-14.8l112 0c13.3 0 24 10.7 24 24l0 112c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L321 204.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176S0 401.2 0 304s78.8-176 176-176c37 0 71.4 11.4 99.8 31l52.6-52.6L295 73c-6.9-6.9-8.9-17.2-5.2-26.2zM400 80s0 0 0 0s0 0 0 0s0 0 0 0zM176 416a112 112 0 1 0 0-224 112 112 0 1 0 0 224z" />
                </svg>
              </span>
            ) : (
              <span className="w-3 h-3 mr-1">
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  fill="#9ca3af"
                >
                  <path d="M80 176a112 112 0 1 1 224 0A112 112 0 1 1 80 176zM224 349.1c81.9-15 144-86.8 144-173.1C368 78.8 289.2 0 192 0S16 78.8 16 176c0 86.3 62.1 158.1 144 173.1l0 34.9-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-34.9z" />
                </svg>
              </span>
            )}
            <p className="text-sm font-semibold leading-4 text-gray-400 capitalize ml-1">
              {`${person.name} ${person.surname}`}
            </p>
          </div>
        </div>
        <div className="shrink-0 flex flex-row justify-between">
          <div className="pl-2 flex items-center">
            {loading ? (
              <span className="block w-3 h-3 ml-2">
                <Spinner />
              </span>
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
