import { useEffect, useRef, useState } from "react";
import {
  deleteCustomer,
  getAllCustomers,
  postAddCustomer,
  updateCustomer,
} from "../api/apiService";
import { useDispatch } from "react-redux";
import {
  addCustomer,
  removeCustomer,
  setCustomers,
  putCustomer,
  setUsersToday,
  addUserToday,
  removeUserToday,
  updateUserToday,
  setFilteredCustomers,
  setFilteredPresentCustomers,
} from "../redux/customersSlice";
import {
  getAllCustomersFirebase,
  getCurrentMonthAndYear,
  getCustomerByID,
} from "../api/apiFirebase";

const useCustomerHook = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  //funcion para obtener el total de dias en el mes actual
  const getDaysInMonth = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  };

  //creo un array que contiene en cada posicion una referencia para poder desplazar a la izquierda y/o derecha
  const scrollRefs = Array.from({ length: getDaysInMonth() }, () =>
    useRef(null)
  );

  const fetchData = async () => {
    try {
      const result = await getAllCustomers();
      //agrego los clientes a redux
      dispatch(setCustomers(result.clientes));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  //Funcion para crear un cliente de la base de datos MySQL
  const handleCreateCustomer = async (customerData) => {
    try {
      // Llamar a la función de la API para crear un cliente
      const newCustomer = await postAddCustomer(customerData);
      //guardar en redux al cliente nuevo
      dispatch(addCustomer(newCustomer));
      //Guardar Cliente presente el dia actual
      dispatch(addUserToday(newCustomer));
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  //Funcion para eliminar un cliente de la base de datos MySQL
  const handleDeleteCustomer = async (id) => {
    try {
      // Llamar a la API para eliminar el cliente
      await deleteCustomer(id);
      // Actualizar el estado de Redux eliminando el cliente de la lista
      dispatch(removeCustomer(id));
      //Eliminar cliente presente el dia actual
      dispatch(removeUserToday(id));
    } catch (error) {
      console.log(error);
    }
  };

  //Funcion para actualizar un cliente de la base de datos MySQL
  const handleUpdateCustomer = async (idCustomer, formData) => {
    try {
      // Llamar a la API para actualizar el cliente
      const customerUpdate = await updateCustomer(idCustomer, formData);
      // Actualizar el estado de Redux actualizando el cliente de la lista
      dispatch(putCustomer(customerUpdate.cliente));
      //Actualizar cliente presente el dia actual
      dispatch(updateUserToday(customerUpdate.cliente));
    } catch (error) {
      console.log(error);
    }
  };

  //Funcion para obtener los presentes del dia actual
  const getCustomersPresentToday = async () => {
    try {
      //Obtengo todos los clientes de Firebase
      const customers = await getAllCustomersFirebase();

      //Obtengo dia actual
      const today = new Date();
      const todayDate = today.getDate();

      //Obtengo mm-aaaa actual
      const currentMonthYear = getCurrentMonthAndYear();

      const presentCustomers = Object.keys(customers).reduce(
        (acc, customerId) => {
          const customer = customers[customerId];
          const assist = customer.assists.find(
            (a) => a.month_year === currentMonthYear
          );

          if (assist) {
            const todayAssist = assist.days.find((day) => day.id === todayDate);
            if (todayAssist && todayAssist.checked) {
              acc.push(customer); // Guardar en un array
            }
          }

          return acc;
        },
        []
      );

      dispatch(setUsersToday(presentCustomers));
    } catch (error) {
      console.log(error);
    }
  };

  const setCustomerPresentToday = (customer) => {
    dispatch(addUserToday(customer));
  };

  const deleteCustomerPresentToday = (customer) => {
    dispatch(removeUserToday(customer));
  };

  const addCustomersFiltered = (customers) => {
    dispatch(setFilteredCustomers(customers));
  };

  const rechargeCustomers = async () => {
    fetchData();
  };

  const addCustomersPresentTodayFiltered = (customers) => {
    dispatch(setFilteredPresentCustomers(customers));
  };

  // Funcion para obtener un valor booleano si el cliente esta activo o no
  const getActiveCustomer = async (id) => {
    const customer = await getCustomerByID(id);
    if (customer && customer.assists && customer.assists.length > 0) {
      const activeC = customer.assists[customer.assists.length - 1].pay_month;
      return activeC;
    }
    return false; // Asegúrate de devolver algo en caso de que no se cumplan las condiciones
  };

  return {
    loading,
    handleCreateCustomer,
    handleDeleteCustomer,
    handleUpdateCustomer,
    getCustomersPresentToday,
    setCustomerPresentToday,
    deleteCustomerPresentToday,
    addCustomersFiltered,
    rechargeCustomers,
    addCustomersPresentTodayFiltered,
    getActiveCustomer,
    scrollRefs,
  };
};

export default useCustomerHook;
