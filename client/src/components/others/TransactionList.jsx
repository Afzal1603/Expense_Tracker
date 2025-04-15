import axios from "axios";
import React, { useEffect, useState } from "react";

const TransactionList = () => {
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

  if (!transactions?.length) {
    return <p className="text-muted-foreground">No transactions found.</p>;
  }

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div
          key={tx._id}
          className="bg-white rounded-2xl shadow p-4 flex items-center justify-between"
        >
          <div>
            <p className="text-lg font-medium">{tx.description}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(tx.date).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p
              className={`text-lg font-semibold ${
                tx.amount >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ₹ {tx.amount.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
