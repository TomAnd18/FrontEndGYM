import { useEffect, useRef, useState } from "react";
import {
  deleteCustomer,
  getAllCustomers,
  getCustomerAPIByID,
  postAddCustomer,
  updateCustomer,
} from "../api/apiService";
import { useDispatch } from "react-redux";
import {
  addCustomer,
  removeCustomer,
  setCustomers,
  putCustomer,
  clearAllCustomers,
  setUsersToday,
  addUserToday,
  removeUserToday,
  updateUserToday,
  setFilteredCustomers,
  setFilteredPresentCustomers,
  addCustomerSortNameAZ,
  addCustomerSortNameZA,
  addCustomerSortSurnameAZ,
  addCustomerSortSurnameZA,
} from "../redux/customersSlice";
import {
  getAllCustomersFirebase,
  getCurrentMonthAndYear,
  getCustomerByID,
  updateCheckPayDataUser,
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
      // dispatch(setCustomers(result.clientes));
      dispatch(setCustomers(result));
      // console.log(result);
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
  const handleCreateCustomer = async (customerData, order) => {
    try {
      // Llamar a la función de la API para crear un cliente
      const newCustomer = await postAddCustomer(customerData);

      //guardar en redux al cliente nuevo dependiendo el tipo de ordenamiento
      if (order == "default") {
        dispatch(addCustomer(newCustomer));
      }
      if (order == "nameAZ") {
        dispatch(addCustomerSortNameAZ(newCustomer));
      }
      if (order == "nameZA") {
        dispatch(addCustomerSortNameZA(newCustomer));
      }
      if (order == "surnameAZ") {
        dispatch(addCustomerSortSurnameAZ(newCustomer));
      }
      if (order == "surnameZA") {
        dispatch(addCustomerSortSurnameZA(newCustomer));
      }
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
      // dispatch(putCustomer(customerUpdate.cliente));
      dispatch(putCustomer(customerUpdate));
      //Actualizar cliente presente el dia actual
      // dispatch(updateUserToday(customerUpdate.cliente));
      dispatch(updateUserToday(customerUpdate));
    } catch (error) {
      console.log(error);
    }
  };

  const saveSortCustomers = (data) => {
    //Elimino todos los clientes del dispatch
    dispatch(clearAllCustomers());

    //Agrego a los clientes ordenados
    dispatch(setCustomers(data));
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

  const rechargeCustomers = async (data) => {
    dispatch(setCustomers(data));
    //fetchData();
  };

  const rechargeCustomersDefault = async () => {
    fetchData();
  };

  const addCustomersPresentTodayFiltered = (customers) => {
    dispatch(setFilteredPresentCustomers(customers));
  };

  // // Funcion para obtener un valor booleano si el cliente esta activo o no
  // const getActiveCustomer = async (id) => {
  //   const customer = await getCustomerByID(id);
  //   if (customer && customer.assists && customer.assists.length > 0) {
  //     const activeC = customer.assists[customer.assists.length - 1].pay_month;
  //     return activeC;
  //   }
  //   return false; // Asegúrate de devolver algo en caso de que no se cumplan las condiciones
  // };

  // const rechargeAllViewCustomers = (id, dataCustomer) => {
  //   handleUpdateCustomer(id, dataCustomer);
  //   getCustomersPresentToday();
  // };

  const updateStatePayMonthCustomer = async (id, date, state) => {
    const customer = await getCustomerByID(id);

    if (customer && customer.assists && customer.assists.length > 0) {
      customer.assists.map((month, index) => {
        if (month.month_year == date) {
          customer.assists[index].pay_month = state;
        }
      });
    }
    const customerPayUpdated = await updateCheckPayDataUser(customer);
    const customerUpdated = await getCustomerByID(id);

    handleUpdateCustomer(id, customerUpdated);
  };

  const getDateCreationCustomer = async (id) => {
    const dataCustomersAPI = await getCustomerAPIByID(id);

    const dateCreation = dataCustomersAPI.created_at;

    return dateCreation;
  };

  return {
    loading,
    handleCreateCustomer,
    handleDeleteCustomer,
    handleUpdateCustomer,
    saveSortCustomers,
    getCustomersPresentToday,
    setCustomerPresentToday,
    deleteCustomerPresentToday,
    addCustomersFiltered,
    rechargeCustomers,
    rechargeCustomersDefault,
    addCustomersPresentTodayFiltered,
    updateStatePayMonthCustomer,
    getDateCreationCustomer,
    scrollRefs,
  };
};

export default useCustomerHook;
