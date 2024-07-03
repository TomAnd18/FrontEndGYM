import NavBar from "../layouts/NavBar";
import StackedList from "../components/lists/StackedList";
import Calendar from "../components/calendars/Calendar";
import SearchUserStackedList from "../components/SearchUserStackedList";
import MiniStackedList from "../components/lists/MiniStackedList";
import BtnAddUser from "../components/buttons/BtnAddUser";
import AsideList from "../components/AsideList";

export default function Dashboard() {
  return (
    <>
      <div className="w-full">
        <NavBar />
        <main className="md:m-4 w-full pb-28 md:w-auto shadow-md shadow-gray-300 rounded-lg">
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
                  <div>
                    <BtnAddUser />
                  </div>
                  <div className="w-full mb-4 sm:mb-0">
                    <SearchUserStackedList />
                  </div>
                </div>
                <div>
                  <StackedList />
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col">
                <div className="w-auto mb-12 flex justify-center">
                  <Calendar />
                </div>
                <div className="w-auto mx-3 md:mx-0">
                  <div>
                    <AsideList />
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
