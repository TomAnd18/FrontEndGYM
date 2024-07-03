import { postDataUser, updateDataUser } from "./apiFirebase";

const url = import.meta.env.VITE_BACKEND_API;

export const getAllCustomers = async () => {
  try {
    const response = await fetch(`${url}/customers`);
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.log(error);
  }
};

export const postAddCustomer = async (formData) => {
  const response = await fetch(`${url}/customer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  const data = await response.json();

  //agregar datos del cliente a firebase + datos de asistencia
  const dataFirebase = await postDataUser(data.cliente);

  return data.cliente;
};

export const deleteCustomer = async (id) => {
  try {
    const datos = await fetch(`${url}/customer/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return datos;
  } catch (error) {
    console.log(error);
  }
};

export const updateCustomer = async (id, formData) => {
  try {
    const response = await fetch(`${url}/customer/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    //agregar datos del cliente a firebase + datos de asistencia
    const dataUSer = data.cliente;
    const dataFirebase = await updateDataUser(dataUSer);

    return data;
  } catch (error) {
    console.log(error);
  }
};
