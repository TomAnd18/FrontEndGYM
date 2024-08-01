const urlFirebase = import.meta.env.VITE_FIREBASEAPI_URL;

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

export const getCurrentMonthAndYear = () => {
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
        pay_month: true,
      },
    ],
  };

  const response = await fetch(`${urlFirebase}/${dataUser.id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDataUser),
  });

  const data = response.json();

  return data;
};

export const updateDataUser = async (dataUser) => {
  const responseCustomerFirebase = await fetch(
    `${urlFirebase}/${dataUser.id}.json`
  );
  const dataCustomerFirebase = await responseCustomerFirebase.json();
  const assistsCustomerFirebase = dataCustomerFirebase.assists;

  const newDataUser = {
    id: dataUser.id,
    name: dataUser.name,
    surname: dataUser.surname,
    gender: dataUser.gender,
    phone_number: dataUser.phone_number,
    subscription: dataUser.subscription,
    date_of_birth: dataUser.date_of_birth,
    active: dataUser.active,
    assists: assistsCustomerFirebase,
  };

  const response = await fetch(`${urlFirebase}/${dataUser.id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDataUser),
  });

  const data = await response.json();

  return data;
};

export const getAllCustomersFirebase = async () => {
  try {
    const response = await fetch(`${urlFirebase}.json`);
    const customers = response.json();
    return customers;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDataUser = async (id) => {
  try {
    const response = await fetch(`${urlFirebase}/${id}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCustomerByID = async (id) => {
  try {
    const response = await fetch(`${urlFirebase}/${id}.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentDayOfMonth = () => {
  const today = new Date();
  return today.getDate();
};
