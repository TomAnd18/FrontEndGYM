import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import FormAddUser from "../forms/FormAddUser";

export default function ModalAddUser({
  activate,
  deactivateModal,
  handleCreateCustomer,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(activate);
  }, [activate]);

  const handleClose = () => {
    setOpen(false);
    deactivateModal();
  };

  return (
    <Dialog className="relative z-30" open={open} onClose={handleClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            {/* <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-center sm:justify-center">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="mt-2">
                    <FormAddUser
                      closeModalForm={handleClose}
                      handleCreateCustomer={handleCreateCustomer}
                    />
                  </div>
                </div>
              </div>
            </div> */}
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Información personal
                  </DialogTitle>
                  <div className="mt-2">
                    <div>
                      <FormAddUser
                        closeModalForm={handleClose}
                        handleCreateCustomer={handleCreateCustomer}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
