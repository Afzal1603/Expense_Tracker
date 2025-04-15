import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlyChart = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/transactions/gettransaction"
        );
        setTransactions(res.data);
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const groupByMonth = () => {
      const groupedData = {};
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      transactions.forEach((tx) => {
        const date = new Date(tx.date);
        const year = date.getFullYear();
        const month = date.getMonth(); // 0-based
        const key = `${year}-${month}`;

        if (!groupedData[key]) groupedData[key] = 0;
        groupedData[key] += tx.amount;
      });

      const formattedData = Object.keys(groupedData).map((key) => {
        const [year, month] = key.split("-");
        return {
          month: `${monthNames[parseInt(month)]}-${year}`,
          amount: groupedData[key],
        };
      });

      // Optional: Sort chronologically
      formattedData.sort((a, b) => {
        const [aMonth, aYear] = a.month.split("-");
        const [bMonth, bYear] = b.month.split("-");
        return (
          new Date(`${aYear}-${aMonth}-01`) - new Date(`${bYear}-${bMonth}-01`)
        );
      });

      setMonthlyData(formattedData);
    };

    if (transactions.length > 0) {
      groupByMonth();
    }
  }, [transactions]);

  if (transactions.length === 0) return <h1>Loading..</h1>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Monthly Spending Overview</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyChart;
