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

  return (
    <>
      <div className="w-full">
        <div>
          <NavBar />
        </div>
        <main className="w-full pb-28 md:w-auto ">
          <div className="w-full pb-10 flex flex-col">
            <header className="p-4 sticky top-0 z-20">
              <div className="w-full bg-gray-100 shadow-md shadow-gray-300 rounded-lg">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 p-4">
                  Dashboard
                </h1>
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
              <div className="w-full md:w-auto mr-4 xl:mr-0 flex flex-col xl:flex-row-reverse">
                <div className="w-auto mx-3 mb-4 flex flex-col md:mx-0 xl:mx-4 2xl:mx-8">
                  <div className="xl:sticky xl:top-24 mx-auto md:mx-0">
                    <Calendar />
                  </div>
                  <div className="xl:sticky xl:top-[26rem]">
                    <InfoGeneral loading={loading} />
                  </div>
                </div>
                <div className="flex flex-col w-auto mx-3 md:mx-0 h-full">
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
