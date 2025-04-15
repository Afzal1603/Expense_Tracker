import Charts from "@/components/others/Charts";
import TransactionForm from "@/components/others/TransactionForm";
import React from "react";
import { ToastContainer } from "react-toastify";

const DashBoard = () => {
  return (
    <div>
      <TransactionForm />
      <Charts />
    </div>
  );
};

export default DashBoard;
