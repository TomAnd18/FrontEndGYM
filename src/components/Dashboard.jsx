import NavBar from "./NavBar";
import StackedList from "./StackedList";
import Calendar from "./Calendar";
import ModalAddUser from "./ModalAddUser";
import { useState } from "react";

export default function Dashboard() {
  const [activate, setActivate] = useState(false);

  const activateModalAddUser = () => {
    setActivate(true);
  };

  const deactivateModalAddUser = () => {
    setActivate(false);
  };

  return (
    <>
      <NavBar />
      <div className="w-full">
        <header className="bg-white shadow">
          <div className="w-full px-4 py-6 sm:px-6 lg:px-12">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main className="w-full pb-10 flex flex-col">
          <div className="shadow shadow-gray-400 p-4 m-4 rounded-md">
            <button
              onClick={activateModalAddUser}
              type="button"
              className="border px-3 py-2 rounded-full flex items-center bg-blue-500 text-white hover:bg-blue-600"
            >
              <svg
                className="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="white"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
              </svg>
              Nuevo usuario
            </button>
            <ModalAddUser
              activate={activate}
              deactivateModal={deactivateModalAddUser}
            />
          </div>
          <div className="w-full flex justify-around flex-col md:flex-row pt-10">
            <div className="w-full md:w-1/2 p-4">
              <StackedList />
            </div>
            <div className="container w-auto flex justify-center">
              <Calendar />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
