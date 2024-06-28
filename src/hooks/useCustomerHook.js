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
} from "../redux/customersSlice";

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

  const handleUpdateCustomer = async (idCustomer, formData) => {
    try {
      // Llamar a la API para eliminar el cliente
      const customerUpdate = await updateCustomer(idCustomer, formData);
      // Actualizar el estado de Redux eliminando el cliente de la lista
      dispatch(putCustomer(customerUpdate.cliente));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loading,
    handleCreateCustomer,
    handleDeleteCustomer,
    handleUpdateCustomer,
    scrollRefs,
  };
};

export default useCustomerHook;
