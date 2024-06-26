import { useState } from "react";
import useCustomerHook from "../hooks/useCustomerHook";

export default function Example({ closeModalForm }) {
  const { handleCreateCustomer } = useCustomerHook();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    gender: "Hombre",
    phone_number: "",
    subscription: "Standard",
    date_of_birth: "",
    active: "activo",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //envio los datos del form a redux para que desde ahi guarde el nuevo cliente en la API
      await handleCreateCustomer(formData);

      // Cierra el modal después del envío
      closeModalForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseModalForm = () => {
    closeModalForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Información Personal
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

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
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="firstName"
                  value={formData.name}
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
                  type="text"
                  name="surname"
                  id="surname"
                  autoComplete="surname"
                  value={formData.surname}
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
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  autoComplete="phone_number"
                  value={formData.phoneNumber}
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
                  value={formData.gender}
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
                  value={formData.subscription}
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
                  type="date"
                  name="date_of_birth"
                  id="date_of_birth"
                  autoComplete="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-5">
          <fieldset>
            <div className="space-y-6">
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="pay"
                    name="pay"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="pay" className="font-medium text-gray-900">
                    Realizó el pago del mes
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
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
      </div>
    </form>
  );
}
