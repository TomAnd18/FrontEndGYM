import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import Calendar from "../Calendar";

export default function ModalViewUser({ activate, deactivateModal, person }) {
  const [open, setOpen] = useState(false);

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
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start w-full">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <DialogTitle
                    as="h3"
                    className="text-lg px-4 font-semibold leading-6 text-gray-900 capitalize"
                  >
                    {person.name + " " + person.surname}
                  </DialogTitle>
                  <div className="mt-2 w-full">
                    <div className="w-full">
                      <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
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
                            <p className="text-sm font-medium leading-6 text-gray-900">
                              Fecha de nacimiento
                            </p>
                            <time className="text-sm leading-6 text-gray-700">
                              {formatDate(person.date_of_birth)}
                            </time>
                          </div>
                          <div className="py-6 flex items-center flex-col">
                            <dt className="w-full px-4 mb-4 text-sm font-medium leading-6 text-gray-900">
                              Asistencias
                            </dt>
                            <dd>
                              <Calendar />
                            </dd>
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
