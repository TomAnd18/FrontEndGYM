import React from "react";
import ModalAddUser from "../modals/ModalAddUser";
import { useState } from "react";

export default function BtnAddUser({ handleCreateCustomer }) {
  const [activate, setActivate] = useState(false);

  const activateModalAddUser = () => {
    setActivate(true);
  };

  const deactivateModalAddUser = () => {
    setActivate(false);
  };
  return (
    <>
      <button
        onClick={activateModalAddUser}
        type="button"
        className="border w-max mb-4 px-3 py-2 rounded-full flex items-center bg-blue-500 text-white hover:bg-blue-600"
      >
        <svg
          className="w-6 h-6 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="white"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
        </svg>
        Nuevo Cliente
      </button>
      <ModalAddUser
        activate={activate}
        deactivateModal={deactivateModalAddUser}
        handleCreateCustomer={handleCreateCustomer}
      />
    </>
  );
}
