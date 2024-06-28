import { useState } from "react";
import useCustomerHook from "../../hooks/useCustomerHook";

export default function FormUpdateUser({ closeModalForm, person }) {
  const { handleUpdateCustomer } = useCustomerHook();
  const idCustomer = person.id;
  const [loading, setLoading] = useState(false);

  const [updatedData, setUpdatedData] = useState({
    name: person.name,
    surname: person.surname,
    gender: person.gender,
    phone_number: person.phone_number,
    subscription: person.subscription,
    date_of_birth: person.date_of_birth,
    active: person.active,
  });

  const handleChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      //envio los datos del form a redux para que desde ahi guarde el nuevo cliente en la API
      await handleUpdateCustomer(idCustomer, updatedData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      closeModalForm();
    }
  };

  const handleCloseModalForm = () => {
    closeModalForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nombre/s
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="firstName"
                  value={updatedData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="surname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Apellido/s
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="surname"
                  id="surname"
                  autoComplete="surname"
                  value={updatedData.surname}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Teléfono
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  autoComplete="phone_number"
                  value={updatedData.phone_number}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Genero
              </label>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  autoComplete="gender"
                  value={updatedData.gender}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Hombre</option>
                  <option>Mujer</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="subscription"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Suscripción
              </label>
              <div className="mt-2">
                <select
                  id="subscription"
                  name="subscription"
                  autoComplete="subscription"
                  value={updatedData.subscription}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Standard</option>
                  <option>Premium</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="date_of_birthday"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Fecha de nacimiento
              </label>
              <div className="mt-2">
                <input
                  required
                  type="date"
                  name="date_of_birth"
                  id="date_of_birth"
                  autoComplete="date_of_birth"
                  value={updatedData.date_of_birth}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        {loading ? (
          <div>
            <p>Guardando...</p>
          </div>
        ) : (
          <>
            <button
              onClick={handleCloseModalForm}
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Guardar
            </button>
          </>
        )}
      </div>
    </form>
  );
}
