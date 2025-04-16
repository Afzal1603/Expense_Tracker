import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "react-toastify";

const BudgetChart2 = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [comparisonData, setComparisonData] = useState([]);

  const URL = import.meta.env.VITE_API_URL || "http://localhost:5000/";

  const fetchComparison = async () => {
    try {
      const res = await axios.get(
        `${URL}api/budgets/compare?month=${month}&year=${year}`
      );
      setComparisonData(res.data);
    } catch (err) {
      toast.error("Failed to load comparison");
    }
  };

  useEffect(() => {
    fetchComparison();
  }, [month, year]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Compare Budget vs Spending</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label>Month</Label>
            <Input
              type="number"
              min="1"
              max="12"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
          <div>
            <Label>Year</Label>
            <Input
              type="number"
              min="2000"
              max="2099"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={fetchComparison}>Compare</Button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Results</h3>
        {comparisonData.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="budget" fill="#8884d8" name="Budget" />
              <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-muted-foreground">
            No data found for selected month.
          </p>
        )}
      </div>
    </div>
  );
};

export default BudgetChart2;
