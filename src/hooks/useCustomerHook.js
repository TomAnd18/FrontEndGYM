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
} from "../redux/customersSlice";
import {
  getAllCustomersFirebase,
  getCurrentMonthAndYear,
} from "../api/apiFirebase";

const useCustomerHook = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getDaysInMonth = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return lastDayOfMonth;
  };

  const scrollRefs = Array.from({ length: getDaysInMonth() }, () =>
    useRef(null)
  );

  useEffect(() => {
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

    fetchData();
  }, [dispatch]);

  const handleCreateCustomer = async (customerData) => {
    try {
      // Llamar a la función de la API para crear un cliente
      const newCustomer = await postAddCustomer(customerData);
      //guardar en redux
      dispatch(addCustomer(newCustomer));
    } catch (error) {
      console.error("Error creating customer:", error);
      // Puedes manejar el error aquí según sea necesario
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      // Llamar a la API para eliminar el cliente
      await deleteCustomer(id);
      // Actualizar el estado de Redux eliminando el cliente de la lista
      dispatch(removeCustomer(id));
    } catch (error) {
      console.log(error);
    }
  };

  //Funcion para actualizar un cliente de MySQL
  const handleUpdateCustomer = async (idCustomer, formData) => {
    try {
      // Llamar a la API para actualizar el cliente
      const customerUpdate = await updateCustomer(idCustomer, formData);
      // Actualizar el estado de Redux actualizando el cliente de la lista
      dispatch(putCustomer(customerUpdate.cliente));
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

      console.log(presentCustomers);
      dispatch(setUsersToday(presentCustomers));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loading,
    handleCreateCustomer,
    handleDeleteCustomer,
    handleUpdateCustomer,
    getCustomersPresentToday,
    scrollRefs,
  };
};

export default useCustomerHook;
