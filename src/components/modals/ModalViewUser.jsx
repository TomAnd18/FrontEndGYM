import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import CalendarView from "../calendars/CalendarView";

export default function ModalViewUser({
  activate,
  deactivateModal,
  person,
  updateStatePayMonthCustomer,
  getDateCreationCustomer,
}) {
  const [open, setOpen] = useState(false);
  const [dateCreation, setDateCreation] = useState("");

  const getDateCreatedCustomer = async () => {
    const dateCreated = await getDateCreationCustomer(person.id);
    setDateCreation(dateCreated);
  };

  useEffect(() => {
    getDateCreatedCustomer();
  }, [person]);

  useEffect(() => {
    setOpen(activate);
  }, [activate]);

  const handleClose = () => {
    setOpen(false);
    deactivateModal();
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  function formatDateDataBase(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options); // 'en-GB' for DD-MM-YYYY format
  }

  return (
    <Dialog className="relative z-10" open={open} onClose={handleClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-4xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start w-full">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <DialogTitle
                    as="h3"
                    className="text-lg px-4 font-semibold leading-6 text-gray-900 capitalize flex flex-col justify-start"
                  >
                    <div className="flex items-center mb-4">
                      <div className="h-7 w-7 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          fill="#9ca3c0"
                        >
                          <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                        </svg>
                      </div>
                      <p>{person.name + " " + person.surname}</p>
                    </div>
                    <span className="text-xs flex border-l-2 border-green-500 pl-2">
                      {` fecha de registro: ${formatDateDataBase(
                        dateCreation
                      )}`}
                    </span>
                  </DialogTitle>
                  <div className="mt-2 w-full">
                    <div className="w-full">
                      <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                          <div className="flex justify-around flex-col md:flex-row">
                            <div className="flex flex-col shadow-md bg-gray-50 h-max mt-8 px-0 md:px-4 rounded-md">
                              <div className="py-6 px-4 flex justify-between">
                                <p className="text-sm font-medium leading-6 text-gray-900">
                                  Suscripción
                                </p>
                                <p className="text-sm leading-6 text-gray-700">
                                  {person.subscription}
                                </p>
                              </div>
                              <div className="py-6 px-4 flex justify-between">
                                <p className="text-sm font-medium leading-6 text-gray-900">
                                  Genero
                                </p>
                                <p className="text-sm leading-6 text-gray-700">
                                  {person.gender}
                                </p>
                              </div>
                              <div className="py-6 px-4 flex justify-between">
                                <p className="text-sm font-medium leading-6 text-gray-900">
                                  Telefono
                                </p>
                                <p className="text-sm leading-6 text-gray-700">
                                  {person.phone_number}
                                </p>
                              </div>
                              <div className="py-6 px-4 flex justify-between">
                                <p className="text-sm font-medium leading-6 text-gray-900 mr-16">
                                  Fecha de nacimiento
                                </p>
                                <time className="text-sm leading-6 text-gray-700">
                                  {formatDate(person.date_of_birth)}
                                </time>
                              </div>
                            </div>
                            <div className="py-6 flex items-center flex-col">
                              <dt className="w-full mb-4 text-sm font-medium leading-6 text-gray-900">
                                Asistencias
                              </dt>
                              <dd>
                                <CalendarView
                                  person={person}
                                  updateStatePayMonthCustomer={
                                    updateStatePayMonthCustomer
                                  }
                                />
                              </dd>
                            </div>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              Rutina
                            </dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <ul
                                role="list"
                                className="divide-y divide-gray-100 rounded-md border border-gray-200"
                              >
                                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                  <div className="flex w-0 flex-1 items-center">
                                    <PaperClipIcon
                                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                      <span className="truncate font-medium">
                                        rutina_name.pdf
                                      </span>
                                      <span className="flex-shrink-0 text-gray-400">
                                        2.4mb
                                      </span>
                                    </div>
                                  </div>
                                  <div className="ml-4 flex-shrink-0">
                                    <a
                                      href="#"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Descargar
                                    </a>
                                  </div>
                                </li>
                              </ul>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => handleClose()}
                data-autofocus
              >
                Cerrar
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
