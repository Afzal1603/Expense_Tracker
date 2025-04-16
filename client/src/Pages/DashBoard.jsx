import React from "react";
import { ToastContainer } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, PlusCircle, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashBoard = () => {
  // Dummy chart data for expenses
  const chartData = [
    { month: "Jan", expense: 5000 },
    { month: "Feb", expense: 4000 },
    { month: "Mar", expense: 3000 },
    { month: "Apr", expense: 2000 },
    { month: "May", expense: 4000 },
    { month: "Jun", expense: 3500 },
  ];

  return (
    <div className="p-6 bg-muted min-h-screen">
      <ToastContainer />

      {/* Welcome Text */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary">
          Welcome to Your Finance Dashboard
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Start tracking your income and expenses with ease.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Add Expense</CardTitle>
            <PlusCircle className="text-primary" />
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Log your recent spending to keep things updated.
            </p>
            <Link to="/form">
              <Button variant="outline">Add Now</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">View Reports</CardTitle>
            <BarChart className="text-primary" />
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Analyze where your money goes each month.
            </p>

            {/* Recharts Bar Chart (Large) */}

            <Link to="/monthly">
              <Button variant="outline">See Reports</Button>
            </Link>
          </CardContent>
        </Card>

        {/* <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Total Balance</CardTitle>
            <DollarSign className="text-primary" />
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-2xl font-semibold text-green-600">₹12,450</p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: Today
            </p>
          </CardContent>
        </Card> */}
      </div>

      <div className="mt-10">
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg">Expense Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="expense" fill="#82ca9d" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashBoard;
