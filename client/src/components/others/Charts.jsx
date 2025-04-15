import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionChart from "./TransactionChart";
import TransactionList from "./TransactionList";
import MonthlyChart from "./Monthly";

const Charts = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/transactions/gettransaction"
      );

      setTransactions(res.data);
    };

    fetchData();
  }, []);
  console.log(transactions);
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Spending Overview</h1>
      {transactions.length <= 0 ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <TransactionChart data={transactions} />
        </>
      )}
    </div>
  );
};

export default Charts;
