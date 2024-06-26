import NavBar from "../components/NavBar";
import StackedList from "../components/StackedList";
import Calendar from "../components/Calendar";
import ModalAddUser from "../components/ModalAddUser";
import { useState } from "react";
import SearchUserStackedList from "../components/SearchUserStackedList";
import MiniStackedList from "../components/MiniStackedList";

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
      <div className="w-full">
        <NavBar />
        <main className="md:m-4 w-full md:w-auto shadow-md shadow-gray-300 rounded-lg">
          <div className="w-full pb-10 flex flex-col">
            <header className="p-4 border-b-2 rounded-md bg-gray-100">
              <div className="w-full">
                <div className="w-full p-6">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Dashboard
                  </h1>
                </div>
              </div>
            </header>
            <div className="w-full flex justify-evenly flex-col-reverse md:flex-row-reverse pt-10">
              <div className="w-full md:w-1/2 p-4">
                <div className="w-full flex flex-col mb-10 justify-between">
                  {/* boton de agregar usuario */}
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
                    Nuevo usuario
                  </button>
                  <ModalAddUser
                    activate={activate}
                    deactivateModal={deactivateModalAddUser}
                  />
                  {/* input para buscar usuarios */}
                  <div className="w-full mb-4 sm:mb-0">
                    <SearchUserStackedList />
                  </div>
                </div>
                <StackedList />
              </div>
              <div className="w-full md:w-auto flex flex-col">
                <div className="w-auto mb-12 flex justify-center">
                  <Calendar />
                </div>
                <div className="w-auto mx-3 md:mx-0">
                  <div className="text-md text-gray-500 mb-4 p-4 bg-gray-50 rounded-lg">
                    <p>
                      <b>Asistencias:</b> 4 en el día
                    </p>
                    <p>
                      <b>Faltas:</b> 4 usuarios no asistieron hoy
                    </p>
                  </div>
                  <div className="w-auto mb-4">
                    <SearchUserStackedList />
                  </div>
                  <div className="w-auto">
                    <MiniStackedList />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
