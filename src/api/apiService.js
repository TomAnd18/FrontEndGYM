const url = "http://localhost:8000/api";

export const getAllCustomers = async () => {
  try {
    const response = await fetch(`${url}/customers`);
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.log(error);
  }
};
