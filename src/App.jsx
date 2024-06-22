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
