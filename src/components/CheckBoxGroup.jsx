import React, { useEffect, useState, forwardRef } from "react";

const CheckBoxGroup = forwardRef(() => {
  const getDaysInMonth = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  };

  const initialCheckboxesState = Array.from(
    { length: getDaysInMonth() },
    (_, i) => ({
      id: i + 1,
      checked: false,
    })
  );

  const [checkboxes, setCheckboxes] = useState(initialCheckboxesState);

  const handleCheckBoxChange = (id) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  return (
    <>
      {checkboxes.map((checkbox) => (
        <div key={checkbox.id} className="relative flex gap-x-3 ml-1.5">
          <div
            className={`flex h-6 items-center relative rounded-md ${
              checkbox.checked ? "text-white" : "text-black hover:text-white"
            }`}
          >
            <input
              id={`checkbox-${checkbox.id}`}
              name={`checkbox-${checkbox.id}`}
              type="checkbox"
              className="h-6 w-6 rounded-md border-gray-200 text-blue-500 focus:ring-blue-500 checked:bg-none cursor-pointer hover:bg-blue-500"
              checked={checkbox.checked}
              onChange={() => handleCheckBoxChange(checkbox.id)}
            />
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs font-bold">
              {checkbox.id}
            </span>
          </div>
        </div>
      ))}
    </>
  );
});

export default CheckBoxGroup;
