// src/components/CategoryPieChart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#a4de6c",
  "#d0ed57",
];

const CategoryPieChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const URL = import.meta.env.VITE_API_URL || "http://localhost:5000/";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`${URL}api/transactions/gettransaction`);
        const transactions = res.data;

        // Group by category
        const grouped = transactions.reduce((acc, tx) => {
          const cat = tx.category || "Others";
          const found = acc.find((item) => item.name === cat);
          if (found) {
            found.value += tx.amount;
          } else {
            acc.push({ name: cat, value: tx.amount });
          }
          return acc;
        }, []);

        setCategoryData(grouped);
      } catch (err) {
        console.error("Error fetching transactions:", err.message);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className=" h-[350px] mt-8 mb-4">
      <h2 className="text-xl font-bold mb-4  ">Expenses by Category</h2>
      {categoryData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-muted-foreground">
          No transaction data found.
        </p>
      )}
    </div>
  );
};

export default CategoryPieChart;
