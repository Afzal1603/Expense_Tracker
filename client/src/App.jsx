import React from "react";

import { Routes, Route } from "react-router-dom";
import DashBoard from "./Pages/DashBoard";
import Sidebar from "./components/others/Sidebar";
import Header from "./components/others/Header";
import TransactionForm from "./components/others/TransactionForm";
import MonthlyChart from "./components/others/Monthly";
import TransactionList from "./components/others/TransactionList";
import Charts from "./components/others/Charts";

const App = () => {
  return (
    <div className="min-h-screen mx-auto flex flex-col md:flex-row bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/form" element={<TransactionForm />}></Route>
            <Route path="/monthly" element={<MonthlyChart />}></Route>
            <Route path="/expenses-list" element={<TransactionList />}></Route>
            <Route path="/daily" element={<Charts />}></Route>
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
