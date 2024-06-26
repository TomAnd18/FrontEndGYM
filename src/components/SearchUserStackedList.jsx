import React from "react";

export default function SearchUserStackedList() {
  return (
    <>
      <div className="relative">
        <div className="absolute flex items-center pl-4 top-0 bottom-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="w-5 h-5"
          >
            <path d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"></path>
          </svg>
        </div>
        <input
          id="search"
          name="search"
          className="block w-full rounded-full pl-12"
          placeholder="Buscar usuario"
          type="search"
        ></input>
      </div>
    </>
  );
}
