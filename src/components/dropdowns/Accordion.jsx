import React, { useState } from "react";
import MiniStackedList from "../lists/MiniStackedList";

export default function Accordion({ loading, getCustomersPresentToday }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      <div className="border rounded-lg bg-gray-100 shadow-gray-300 shadow-md">
        <button
          onClick={() => toggleAccordion(0)}
          className="w-full flex justify-between items-center py-2 px-4 text-left text-md font-bold text-gray-500"
        >
          Asistencias
          {activeIndex === 0 ? (
            <span className="size-4">
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
              </svg>
            </span>
          ) : (
            <span className="size-4">
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>
            </span>
          )}
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            activeIndex === 0 ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-auto z-10 mb-4">
            <MiniStackedList
              loading={loading}
              getCustomersPresentToday={getCustomersPresentToday}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
