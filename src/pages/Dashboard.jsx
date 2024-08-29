import NavBar from "../layouts/NavBar";
import StackedList from "../components/lists/StackedList";
import Calendar from "../components/calendars/Calendar";
import SearchUserStackedList from "../components/searches/SearchUserStackedList";
import BtnAddUser from "../components/buttons/BtnAddUser";
import AsideList from "../components/AsideList";
import useCustomerHook from "../hooks/useCustomerHook";
import SelectFilter from "../components/dropdowns/SelectFilter";
import SelectOrder from "../components/dropdowns/SelectOrder";
import Badge from "../components/badges/Badge";
import InfoGeneral from "../components/InfoGeneral";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

export default function Dashboard() {
  const {
    addCustomersFiltered,
    rechargeCustomers,
    rechargeCustomersDefault,
    handleCreateCustomer,
    loading,
    getCustomersPresentToday,
    scrollRefs,
    setCustomerPresentToday,
    deleteCustomerPresentToday,
    handleDeleteCustomer,
    handleUpdateCustomer,
    addCustomersPresentTodayFiltered,
    updateStatePayMonthCustomer,
    getDateCreationCustomer,
    saveSortCustomers,
    saveFilterCustomers,
  } = useCustomerHook();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="w-full">
        {/* <div>
          <NavBar />
        </div> */}
        <main className="w-full pb-28 md:w-auto ">
          <div className="w-full pb-10 flex flex-col">
            <header className="p-3 sticky top-0 z-20 bg-white">
              <div className="w-full flex justify-between py-4 px-4 md:px-16 bg-gray-100 shadow-md shadow-gray-300 rounded-lg">
                <h1 className="text-lg lg:text-2xl xl:text-3xl font-bold tracking-tight text-gray-900">
                  Dashboard
                </h1>
                {/* Profile dropdown */}
                <div className="flex items-center">
                  <Menu as="div" className="relative ml-3 z-30">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            fill="#9ca3b7"
                          >
                            <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                          </svg>
                        </div>
                        {/* <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      /> */}
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="#"
                            className={classNames(
                              focus ? "bg-gray-100" : "",
                              "flex items-start font-semibold px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            <div className="w-4 h-4 mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                className="w-4 h-4"
                              >
                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                              </svg>
                            </div>
                            Cuenta
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="#"
                            className={classNames(
                              focus ? "bg-gray-100" : "",
                              "flex items-center font-semibold px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            <div className="w-4 h-4 mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="w-4 h-4"
                              >
                                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                              </svg>
                            </div>
                            Salir
                          </a>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </header>
            <div className="w-full flex justify-center flex-col-reverse md:flex-row-reverse pt-5">
              <div className="w-full md:w-1/2">
                <div className="w-full flex flex-col justify-between mb-2 md:mb-3 p-2 md:p-0">
                  <div className="flex mb-4 flex-col">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center">
                      <div className="flex">
                        <BtnAddUser
                          handleCreateCustomer={handleCreateCustomer}
                        />
                      </div>
                      <div className="flex mt-4 lg:mt-0">
                        <div>
                          <SelectOrder
                            saveSortCustomers={saveSortCustomers}
                            rechargeCustomersDefault={rechargeCustomersDefault}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mb-0">
                    <SearchUserStackedList
                      addCustomersFiltered={addCustomersFiltered}
                      rechargeCustomers={rechargeCustomers}
                    />
                  </div>
                  <div className="mt-2 flex w-full justify-end">
                    <div className="flex">
                      <Badge loading={loading} />
                    </div>
                  </div>
                </div>
                <div>
                  <StackedList
                    loading={loading}
                    scrollRefs={scrollRefs}
                    setCustomerPresentToday={setCustomerPresentToday}
                    deleteCustomerPresentToday={deleteCustomerPresentToday}
                    handleDeleteCustomer={handleDeleteCustomer}
                    handleUpdateCustomer={handleUpdateCustomer}
                    updateStatePayMonthCustomer={updateStatePayMonthCustomer}
                    getDateCreationCustomer={getDateCreationCustomer}
                  />
                </div>
              </div>
              <div className="w-full md:w-auto mr-4 xl:mr-0 flex flex-col xl:flex-row">
                <div className="w-auto mx-3 md:mx-0 mb-4 flex flex-col">
                  <div className="xl:sticky xl:top-24 mx-auto md:mx-0">
                    <Calendar />
                  </div>
                  <div className="xl:sticky xl:top-[26rem]">
                    <InfoGeneral loading={loading} />
                  </div>
                </div>
                <div className="flex flex-col w-auto mx-3 md:mx-0 xl:mx-4 2xl:mx-8 h-full">
                  <AsideList
                    addCustomersPresentTodayFiltered={
                      addCustomersPresentTodayFiltered
                    }
                    getCustomersPresentToday={getCustomersPresentToday}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
