import React from "react";
import Spinner from "./spinners/Spinner";
import { useSelector } from "react-redux";

export default function InfoGeneral({ loading }) {
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
  const filterPremium = () => {
    return allCustomers.filter((item) => item.subscription === "Premium")
      .length;
  };
  const filterStandard = () => {
    return allCustomers.filter((item) => item.subscription === "Standard")
      .length;
  };

  return (
    <>
      <div className="mt-4 p-4 bg-gray-100 shadow-md shadow-gray-300 rounded-lg">
        <div className="flex justify-center items-center mb-3 ">
          <span className="w-4 h-4">
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M280 64l40 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l40 0 9.6 0C121 27.5 153.3 0 192 0s71 27.5 78.4 64l9.6 0zM64 112c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16l-16 0 0 24c0 13.3-10.7 24-24 24l-88 0-88 0c-13.3 0-24-10.7-24-24l0-24-16 0zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
            </svg>
          </span>
          <p className="text-gray-500 text-md ml-1 font-bold">
            Información general
          </p>
        </div>
        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <span className="w-3 h-3 mr-1">
              <svg
                className="w-3 h-3"
                fill="#6b7280"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
              </svg>
            </span>
            <p className="ml-1 font-semibold text-gray-500 text-sm">
              Registrados
            </p>
          </div>
          <div className="flex justify-center items-center">
            {loading ? (
              <span className="block w-3 h-3 ml-2">
                <Spinner />
              </span>
            ) : (
              <p className="ml-2 font-semibold text-gray-400 text-sm">
                {allCustomers.length}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <span className="w-3.5 h-3.5 mr-1">
              <svg
                className="w-3.5 h-3.5"
                fill="#6b7280"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
              </svg>
            </span>
            <p className="ml-1 font-semibold text-gray-500 text-sm">
              Inactivos
            </p>
          </div>
          <div className="flex justify-center items-center">
            {loading ? (
              <span className="block w-3 h-3 ml-2">
                <Spinner />
              </span>
            ) : (
              <p className="ml-2 font-semibold text-gray-400 text-sm">
                {filterInactive()}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <span className="w-3.5 h-3.5 mr-1">
              <svg
                className="w-3.5 h-3.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="#6b7280"
              >
                <path d="M289.8 46.8c3.7-9 12.5-14.8 22.2-14.8l112 0c13.3 0 24 10.7 24 24l0 112c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L321 204.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176S0 401.2 0 304s78.8-176 176-176c37 0 71.4 11.4 99.8 31l52.6-52.6L295 73c-6.9-6.9-8.9-17.2-5.2-26.2zM400 80s0 0 0 0s0 0 0 0s0 0 0 0zM176 416a112 112 0 1 0 0-224 112 112 0 1 0 0 224z" />
              </svg>
            </span>
            <p className="ml-1 font-semibold text-gray-500 text-sm">Hombres</p>
          </div>
          <div className="flex justify-center items-center">
            {loading ? (
              <span className="block w-3 h-3 ml-2">
                <Spinner />
              </span>
            ) : (
              <p className="ml-2 font-semibold text-gray-400 text-sm">
                {filterHombre()}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <span className="w-3.5 h-3.5 mr-1">
              <svg
                className="w-3.5 h-3.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                fill="#6b7280"
              >
                <path d="M80 176a112 112 0 1 1 224 0A112 112 0 1 1 80 176zM224 349.1c81.9-15 144-86.8 144-173.1C368 78.8 289.2 0 192 0S16 78.8 16 176c0 86.3 62.1 158.1 144 173.1l0 34.9-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-34.9z" />
              </svg>
            </span>
            <p className="ml-1 font-semibold text-gray-500 text-sm">Mujeres</p>
          </div>
          <div className="flex justify-center items-center">
            {loading ? (
              <span className="block w-3 h-3 ml-2">
                <Spinner />
              </span>
            ) : (
              <p className="ml-2 font-semibold text-gray-400 text-sm">
                {filterMujer()}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <span className="w-3.5 h-3.5 mr-1">
              <svg
                className="w-3.5 h-3.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="#6b7280"
              >
                <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6l277.2 0c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
              </svg>
            </span>
            <p className="ml-1 font-semibold text-gray-500 text-sm">
              Clientes Premium
            </p>
          </div>
          <div className="flex justify-center items-center">
            {loading ? (
              <span className="block w-3 h-3 ml-2">
                <Spinner />
              </span>
            ) : (
              <p className="ml-2 font-semibold text-gray-400 text-sm">
                {filterPremium()}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <span className="w-3.5 h-3.5 mr-1">
              <svg
                className="w-3.5 h-3.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="#6b7280"
              >
                <path d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0L133.9 0c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0L487.4 0C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z" />
              </svg>
            </span>
            <p className="ml-1 font-semibold text-gray-500 text-sm">
              Clientes Standard
            </p>
          </div>
          <div className="flex justify-center items-center">
            {loading ? (
              <span className="block w-3 h-3 ml-2">
                <Spinner />
              </span>
            ) : (
              <p className="ml-2 font-semibold text-gray-400 text-sm">
                {filterStandard()}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
