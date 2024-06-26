import { useEffect, useState } from "react";
import {
  deleteCustomer,
  getAllCustomers,
  postAddCustomer,
} from "../api/apiService";
import { useDispatch } from "react-redux";
import {
  addCustomer,
  removeCustomer,
  setCustomers,
} from "../redux/customersSlice";

const useCustomerHook = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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

  return { loading, handleCreateCustomer, handleDeleteCustomer };
};

export default useCustomerHook;
