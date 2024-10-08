import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ModalDeleteUser from "../modals/ModalDeleteUser";
import { useState } from "react";
import ModalViewUser from "../modals/ModalViewUser";
import ModalUpdateUser from "../modals/ModalUpdateUser";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({
  idCustomer,
  nameCustomer,
  person,
  handleDeleteCustomer,
  handleUpdateCustomer,
  updateStatePayMonthCustomer,
  getDateCreationCustomer,
  loading,
  activeCustomer,
}) {
  const [activateModalDelete, setActivateModalDelete] = useState(false);
  const [activateModalView, setActivateModalView] = useState(false);
  const [activateModalUpdate, setActivateModalUpdate] = useState(false);

  //Delete User
  const activateModalDeleteUser = () => {
    setActivateModalDelete(true);
  };
  const deactivateModalDeleteUser = () => {
    setActivateModalDelete(false);
  };

  //View User
  const activateModalViewUser = () => {
    setActivateModalView(true);
  };
  const deactivateModalViewUser = () => {
    setActivateModalView(false);
  };

  //Update User
  const activateModalUpdateUser = () => {
    setActivateModalUpdate(true);
  };
  const deactivateModalUpdateUser = () => {
    setActivateModalUpdate(false);
  };

  const optionUser = [
    {
      title: "Ver",
      onClick: activateModalViewUser,
      svg: (
        <svg
          className="w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="#787f89"
        >
          <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
        </svg>
      ),
    },
    {
      title: "Editar",
      onClick: activateModalUpdateUser,
      svg: (
        <svg
          className="w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#787f89"
        >
          <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
        </svg>
      ),
    },
    {
      title: "Dar de baja",
      onClick: activateModalDeleteUser,
      svg: (
        <svg
          className="w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="#787f89"
        >
          <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
        </svg>
      ),
    },
  ];

  const chartOptionsUser = optionUser.map((option, index) => {
    return (
      <MenuItem className="cursor-pointer" key={`dropdown-item-${index}`}>
        {({ focus }) => (
          <div
            onClick={option.onClick}
            className={classNames(
              focus ? "bg-gray-100 text-gray-900" : "text-gray-500",
              "flex px-4 py-2 text-sm flex-row items-center justify-start"
            )}
          >
            {option.svg}
            {option.title}
          </div>
        )}
      </MenuItem>
    );
  });

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="pl-2 inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-1 py-1 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Opciones
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">{chartOptionsUser}</div>
        </MenuItems>
      </Menu>
      <ModalDeleteUser
        activate={activateModalDelete}
        deactivateModal={deactivateModalDeleteUser}
        idCustomer={idCustomer}
        nameCustomer={nameCustomer}
        handleDeleteCustomer={handleDeleteCustomer}
      />
      <ModalViewUser
        activate={activateModalView}
        deactivateModal={deactivateModalViewUser}
        person={person}
        updateStatePayMonthCustomer={updateStatePayMonthCustomer}
        getDateCreationCustomer={getDateCreationCustomer}
        loading={loading}
        activeCustomer={activeCustomer}
      />
      <ModalUpdateUser
        activate={activateModalUpdate}
        deactivateModal={deactivateModalUpdateUser}
        person={person}
        handleUpdateCustomer={handleUpdateCustomer}
      />
    </>
  );
}
