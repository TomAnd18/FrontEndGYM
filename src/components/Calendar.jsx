import React, { useEffect, useState } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const daysM = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

  //Nombres de los dias de la semana
  const divDays = daysM.map((day, index) => {
    return (
      <div key={"name-day-" + index} className="flex justify-center">
        {day}
      </div>
    );
  });

  //Controlar los bordes de cada item del calendario
  const getBorderItem = (index) => {
    return index % 7 === 6 && index != 41
      ? "border-b"
      : index == 41
      ? ""
      : index >= 35 && index <= 40
      ? "border-r"
      : "border-r border-b";
  };

  if (1 == 1) {
    //option1
  } else if (2 == 2) {
    //option2
  } else {
    //nada
  }

  // Array para los nombres de los meses
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  //Obtener dia actual
  const getCurrentDay = () => {
    const now = new Date();
    const day = now.getDate();
    return day;
  };

  // Función para obtener los días del calendario
  const getCalendarDays = (year, month) => {
    const firstDay = new Date(year, month, 0);
    const lastDay = new Date(year, month + 1, 0);

    let prevMonthDays = [];
    let currentMonthDays = [];
    let nextMonthDays = [];

    // Días del mes anterior
    const startDay = firstDay.getDay();
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    for (let i = startDay - 1; i >= 0; i--) {
      prevMonthDays.push({
        day: prevMonthLastDate - i,
        backgroundC: "bg-gray-50",
        color: "text-gray-300",
        currentDay: false,
      });
    }

    // Días del mes actual
    const lastDate = lastDay.getDate();

    for (let i = 1; i <= lastDate; i++) {
      currentMonthDays.push({
        day: i,
        backgroundC: "none",
        color: "text-gray-600",
        currentDay: getCurrentDay() == i,
      });
    }

    // Días del mes siguiente para llenar la cuadrícula de 7x6
    const totalDays = prevMonthDays.length + currentMonthDays.length;
    const remainingDays = 42 - totalDays; // 42 días para una cuadrícula de 7x6

    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push({
        day: i,
        backgroundC: "bg-gray-50",
        color: "text-gray-300",
        currentDay: false,
      });
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setDays(getCalendarDays(year, month));
  }, [currentDate]);

  return (
    <>
      <div className="flex flex-col w-max">
        <div className="flex flex-row w-auto justify-between px-1">
          <button onClick={handlePrevMonth}>
            <svg
              style={{ width: "9px" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
          <div className="font-semibold">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <button style={{ width: "9px" }} onClick={handleNextMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-7 mt-5 mb-3 text-sm">{divDays}</div>
        <div className="border rounded-xl overflow-hidden grid grid-cols-7 gap-0 w-max">
          {days.map((day, index) => (
            <button
              key={"day-" + index}
              className={`${getBorderItem(
                index
              )} w-12 h-10 text-sm hover:bg-gray-100 flex justify-center items-center font-semibold ${
                day.backgroundC
              } ${day.color}`}
            >
              <time
                className={
                  day.currentDay
                    ? "bg-gray-800 text-white flex w-8 h-8 justify-center items-center rounded-full"
                    : ""
                }
              >
                {day.day}
              </time>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
