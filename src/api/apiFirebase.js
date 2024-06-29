const urlFirebase =
  "https://python-app-web-cursos-it-default-rtdb.firebaseio.com";

const getDaysMonthCurrent = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Obtener el último día del mes actual
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  // Obtener el día actual del mes (1 a 31)
  const currentDay = today.getDate();

  // Crear un array con 'false' en cada posición, la posicion "0" no la tomo en cuenta
  const daysArray = Array.from({ length: lastDayOfMonth }, (_, i) => ({
    id: i + 1,
    checked: currentDay == i + 1 ? true : false,
  }));

  return daysArray;
};

const getCurrentMonthAndYear = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // getMonth() devuelve un valor entre 0 y 11

  // Formatear el mes a dos dígitos
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedMonth}-${year}`;
};

export const postDataUser = async (dataUser) => {
  const newDataUser = {
    id: dataUser.id,
    name: dataUser.name,
    surname: dataUser.surname,
    gender: dataUser.gender,
    phone_number: dataUser.phone_number,
    subscription: dataUser.subscription,
    date_of_birth: dataUser.date_of_birth,
    active: dataUser.active,
    assists: [
      {
        days: getDaysMonthCurrent(),
        month_year: getCurrentMonthAndYear(),
      },
    ],
  };

  const response = await fetch(`${urlFirebase}/customers/${dataUser.id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDataUser),
  });

  const data = response.json();

  return data;
};
