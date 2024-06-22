import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import StackedList from "./components/StackedList";
import Calendar from "./components/Calendar";

function App() {
  return (
    <>
      <div className="w-full">
        <NavBar />
        <header className="bg-white shadow">
          <div className="max-w-7xl px-4 py-6 sm:px-6 lg:px-12">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <div className="w-full px-4 py-10 flex flex-col justify-around md:flex-row">
          <div className="w-full md:w-1/2">
            <StackedList />
          </div>
          <div className="container w-auto flex justify-center">
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
