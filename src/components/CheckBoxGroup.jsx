import React, { useEffect, useState } from "react";

const CheckBoxGroup = ({ person }) => {
  //obtener dias del mes actual
  const getDaysInMonth = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  };

  //inicializar un array de tamaño de los dias que tenga el mes actual
  const initialCheckboxesState = Array.from(
    { length: getDaysInMonth() },
    (_, i) => ({
      id: i + 1,
      checked: false,
    })
  );

  const [checkboxes, setCheckboxes] = useState(initialCheckboxesState);
  const API_Firebase = import.meta.env.VITE_FIREBASEAPI_URL;

  useEffect(() => {
    const getCheckBoxesUserFirebase = async () => {
      try {
        const response = await fetch(`${API_Firebase}/${person.id}.json`);
        const dataUserFirebase = await response.json();

        if (
          dataUserFirebase &&
          dataUserFirebase.assists &&
          dataUserFirebase.assists.length > 0
        ) {
          if (
            dataUserFirebase.assists[dataUserFirebase.assists.length - 1]
              .month_year === getCurrentMonthAndYear()
          ) {
            const checkboxesAll =
              dataUserFirebase.assists[dataUserFirebase.assists.length - 1]
                .days;

            const updatedCheckboxesState = Array.from(
              { length: getDaysInMonth() },
              (_, i) => ({
                id: i + 1,
                checked: checkboxesAll[i].checked,
              })
            );
            setCheckboxes(updatedCheckboxesState);
          } else {
            // Si no es el mes actual, crea otro objeto con los dias y fecha mm-aaaa actual
            const newAssist = {
              days: initialCheckboxesState,
              month_year: getCurrentMonthAndYear(),
            };
            dataUserFirebase.assists.push(newAssist);

            await fetch(`${API_Firebase}/${person.id}.json`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataUserFirebase),
            });

            setCheckboxes(initialCheckboxesState);
          }
        }
      } catch (error) {
        console.error("Error desde Firebase:", error);
      }
    };

    getCheckBoxesUserFirebase();
  }, [person.id]);

  const handleCheckBoxChange = async (id) => {
    setCheckboxes((prevCheckboxes) => {
      const newCheckboxes = prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      );

      // Llamar a la función para actualizar en Firebase con el nuevo estado
      postCheckBoxesUserFirebase(newCheckboxes);

      return newCheckboxes;
    });
  };

  const getCurrentMonthAndYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // getMonth() devuelve un valor entre 0 y 11

    // Formatear el mes a dos dígitos
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedMonth}-${year}`;
  };

  const postCheckBoxesUserFirebase = async (updatedCheckboxes) => {
    try {
      const response = await fetch(`${API_Firebase}/${person.id}.json`);
      const dataUserFirebase = await response.json();

      if (
        dataUserFirebase &&
        dataUserFirebase.assists &&
        dataUserFirebase.assists.length > 0
      ) {
        dataUserFirebase.assists[dataUserFirebase.assists.length - 1].days =
          updatedCheckboxes;

        await fetch(`${API_Firebase}/${person.id}.json`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUserFirebase),
        });
      }
    } catch (error) {
      console.error("Error updating data in Firebase:", error);
    }
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
};

export default CheckBoxGroup;
