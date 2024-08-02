import React, { useEffect, useState } from "react";
import { getCustomerByID } from "../../api/apiFirebase";
import Spinner from "../spinners/Spinner";

export default function CalendarView({ person, updateStatePayMonthCustomer }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const daysM = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
  const [daysMonthPaint, setDaysMonthPaint] = useState([]);
  const [countMonth, setCountMonth] = useState(0);
  const [countMonthSelect, setCountMonthSelect] = useState(0);
  const [positionPresents, setPositionPresents] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingCalendar, setLoadingCalendar] = useState(true);
  const [customer, setCustomer] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const getDaysAssists = async (id) => {
    setLoading(true);
    try {
      const data = await getCustomerByID(id);

      setCustomer(data);

      if (data && data.assists && data.assists.length > 0) {
        const arrayDays =
          data.assists[data.assists.length - positionPresents].days;
        setDaysMonthPaint(arrayDays);
        //seteo el tamaño del array para seleccionar el mes de asistencias
        setCountMonth(data.assists.length);

        //seteo el check del pago del mes
        setIsChecked(
          data.assists[data.assists.length - positionPresents].pay_month
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setLoadingCalendar(false);
    }
  };

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
        currentDay: daysMonthPaint[i - 1] && daysMonthPaint[i - 1].checked,
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
    setLoadingCalendar(true);

    if (countMonthSelect < countMonth - 1) {
      setCountMonthSelect(countMonthSelect + 1);
      //setear posicion del array de meses de asistencias
      setPositionPresents(positionPresents + 1);
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      );
    }
  };

  const handleNextMonth = () => {
    setLoadingCalendar(true);

    if (countMonthSelect > 0) {
      setCountMonthSelect(countMonthSelect - 1);
      //setear posicion del array de meses de asistencias
      setPositionPresents(positionPresents - 1);
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      );
    }
  };

  const handleCheckPayMonth = async (e) => {
    setIsChecked(e.target.checked);
    const monthSelect =
      currentDate.getMonth() < 10
        ? `0${currentDate.getMonth() + 1}`
        : currentDate.getMonth();
    const dateSelect = monthSelect + "-" + currentDate.getFullYear();

    await updateStatePayMonthCustomer(person.id, dateSelect, e.target.checked);
  };

  useEffect(() => {
    getDaysAssists(person.id);
  }, [currentDate]);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setDays(getCalendarDays(year, month));
  }, [currentDate, daysMonthPaint]);

  useEffect(() => {
    getDaysAssists(person.id);
  }, [isChecked]);

  return (
    <>
      <div className="flex flex-col w-max">
        <div className="flex flex-row w-auto justify-between px-1">
          <button
            disabled={countMonthSelect < countMonth - 1 ? false : true}
            onClick={handlePrevMonth}
          >
            <svg
              style={{ width: "9px" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill={countMonthSelect < countMonth - 1 ? "" : "#d1d5db"}
                d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
              />
            </svg>
          </button>
          <div className="font-semibold flex w-full justify-center">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <button
            disabled={countMonthSelect > 0 ? false : true}
            onClick={handleNextMonth}
          >
            <svg
              style={{ width: "9px" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill={countMonthSelect > 0 ? "" : "#d1d5db"}
                d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
              />
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
              {loadingCalendar ? (
                <span className="w-4 h-4">
                  <Spinner />
                </span>
              ) : (
                <time
                  className={
                    day.currentDay
                      ? "bg-green-500 text-white flex w-8 h-8 justify-center items-center rounded-full"
                      : ""
                  }
                >
                  {day.day}
                </time>
              )}
            </button>
          ))}
        </div>
        <div className="mt-6 space-y-6">
          <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
              {loading ? (
                <span className="w-4 h-4">
                  <Spinner />
                </span>
              ) : (
                <input
                  id="pay_month"
                  name="pay_month"
                  type="checkbox"
                  onChange={handleCheckPayMonth}
                  checked={isChecked}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              )}
            </div>
            <div className="text-sm leading-6">
              <label
                htmlFor="pay_month"
                className="font-medium text-gray-900 flex items-center"
              >
                Pago del mes de
                {loading ? (
                  <span className="w-3 h-3 mx-1">
                    <Spinner />
                  </span>
                ) : (
                  <span
                    className={`flex w-3 h-3 mx-1 rounded-full ${
                      customer.assists[
                        customer.assists.length - positionPresents
                      ].pay_month
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                )}
                <span className="font-bold text-md">
                  {months[currentDate.getMonth()]}
                </span>
              </label>
              <p className="text-gray-500">
                Marcá la casilla si el cliente realizo el pago del mes
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
