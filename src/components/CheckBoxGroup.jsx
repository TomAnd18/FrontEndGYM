import React, { useEffect, useRef, useState } from "react";
import { getCurrentDayOfMonth, getCustomerByID } from "../api/apiFirebase";

const CheckBoxGroup = ({
  person,
  setCustomerPresentToday,
  deleteCustomerPresentToday,
  scrollRefs,
  index,
}) => {
  const currentDayRef = useRef(null); // Ref para el día actual

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
              pay_month: false,
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
  }, [person]);

  //Funcion para manejar el estado de los checkboxex
  const handleCheckBoxChange = async (id) => {
    // Actualizar el estado de los checkboxes
    const newCheckboxes = checkboxes.map((checkbox) =>
      checkbox.id === id
        ? { ...checkbox, checked: !checkbox.checked }
        : checkbox
    );

    // Actualizar el estado con el nuevo estado de los checkboxes
    setCheckboxes(newCheckboxes);

    // Llamar a la función para actualizar en Firebase con el nuevo estado
    await postCheckBoxesUserFirebase(newCheckboxes);
    //ACtualizar presentes de clientes de redux
    await updatePresentCustomersToday(id, newCheckboxes);
  };

  //Funcion para actualizar la lista de clientes presentes que se muestra en pantalla
  const updatePresentCustomersToday = async (id, newCheckboxes) => {
    if (getCurrentDayOfMonth() === id) {
      if (newCheckboxes[id - 1].checked) {
        //Obtengo los datos del cliente
        const dataCustomer = await getCustomerByID(person.id);
        //Agrego los datos del cliente presente el dia actual a redux
        setCustomerPresentToday(dataCustomer);
      } else {
        //Elimino los datos del cliente presente el dia actual de redux
        deleteCustomerPresentToday(person.id);
      }
    }
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

  //centrar con un scroll automatico el checkbox del dia actual
  useEffect(() => {
    if (currentDayRef.current && scrollRefs[index]?.current) {
      const container = scrollRefs[index].current;
      const currentDayElement = currentDayRef.current;

      const containerRect = container.getBoundingClientRect();
      const currentDayRect = currentDayElement.getBoundingClientRect();

      const scrollLeftPosition =
        currentDayElement.offsetLeft -
        containerRect.width / 2 +
        currentDayRect.width / 2;

      container.scrollTo({ left: scrollLeftPosition, behavior: "smooth" });
    }
  });

  return (
    <>
      <div
        onClick={() => scrollLeft(index)}
        className="absolute cursor-pointer left-0 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full"
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#9ca3b7"
        >
          <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
        </svg>
      </div>
      <div
        ref={scrollRefs[index]}
        style={{ scrollBehavior: "smooth" }}
        className="mx-5 py-1 flex overflow-x-hidden overflow-y-hidden"
      >
        {checkboxes.map((checkbox) => (
          <div
            key={checkbox.id}
            ref={
              checkbox.id === getCurrentDayOfMonth() - 1 ? currentDayRef : null
            }
            className="relative flex gap-x-3 ml-1.5"
          >
            <div
              className={`flex h-6 items-center rounded-lg relative ${
                checkbox.checked ? "text-white" : "text-black hover:text-white"
              }`}
            >
              <input
                id={`checkbox${person.id}-${checkbox.id}`}
                name={`checkbox-${checkbox.id}`}
                type="checkbox"
                className={`h-6 w-6 ${
                  checkbox.id === getCurrentDayOfMonth()
                    ? "rounded-b-lg rounded-t-sm"
                    : "rounded-lg"
                } ${
                  checkbox.id === getCurrentDayOfMonth()
                    ? "border-blue-500 border-2"
                    : "border-gray-200"
                } text-blue-500 focus:ring-blue-500 checked:bg-none cursor-pointer hover:bg-blue-500`}
                checked={checkbox.checked}
                onChange={() => handleCheckBoxChange(checkbox.id)}
              />
              <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs font-bold">
                {checkbox.id}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={() => scrollRight(index)}
        className="absolute cursor-pointer right-0 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full"
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#9ca3b7"
        >
          <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
        </svg>
      </div>
    </>
  );
};

export default CheckBoxGroup;
