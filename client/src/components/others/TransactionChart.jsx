// components/TransactionChart.jsx
import React from "react";
import TransactionList from "./TransactionList";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TransactionChart = ({ data }) => {
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString(), // e.g. "4/15/2025"
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart;
