import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashBoard = () => {
  const [transactions, setTransactions] = useState([]);

  const URL = import.meta.env.VITE_API_URL || "http://localhost:5000/";

  useEffect(() => {
    axios
      .get(`${URL}api/transactions/gettransaction`)
      .then((res) => setTransactions(res.data))
      .catch(() => console.error("Failed to fetch transactions"));
  }, []);

  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);

  const categoryData = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([cat, val]) => ({
    name: cat,
    value: val,
  }));

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#6c5ce7",
    "#00b894",
  ];

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Expenses */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">
              ₹ {total.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        {/* Category Breakdown Pie Chart */}
        <Card className="col-span-1 sm:col-span-2 lg:col-span-1 ">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[340px]">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground">No category data</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="col-span-1 lg:col-span-1 sm:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[340px] overflow-y-auto pr-4">
            {recent.length > 0 ? (
              recent.map((tx) => (
                <div
                  key={tx._id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(tx.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-red-600 whitespace-nowrap">
                    ₹ {tx.amount.toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No recent transactions
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashBoard;
