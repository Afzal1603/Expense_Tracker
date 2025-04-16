import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // ✅ Import Select components
import axios from "axios";

const SetBudgetWithInsights = () => {
  const [form, setForm] = useState({ category: "", amount: "" });
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // 'YYYY-MM'
  const [budgets, setBudgets] = useState([]);
  const [spending, setSpending] = useState([]);

  const URL = import.meta.env.VITE_API_URL || "http://localhost:5000/";

  // Fetch budgets and actual spending data when month changes
  useEffect(() => {
    fetchBudgets();
    fetchSpending();
  }, [month]);

  // Fetch the set budgets for the selected month
  const fetchBudgets = async () => {
    try {
      const res = await axios.get(
        `${URL}api/budgets/getbudgets?month=${month}`
      );
      setBudgets(res.data);
    } catch (err) {
      toast.error("Failed to load budgets");
    }
  };

  // Fetch the actual spending for the selected month
  const fetchSpending = async () => {
    try {
      const res = await axios.get(`${URL}api/transactions/gettransaction`);
      const monthlySpending = res.data.filter((tx) =>
        tx.date.startsWith(month)
      );

      const grouped = monthlySpending.reduce((acc, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
        return acc;
      }, {});

      setSpending(
        Object.entries(grouped).map(([category, amount]) => ({
          category,
          spending: amount,
        }))
      );
    } catch (err) {
      toast.error("Failed to load transactions");
    }
  };

  // Handle setting the budget
  const handleSetBudget = async () => {
    if (!form.category || !form.amount) return toast.error("Fill all fields");

    try {
      await axios.post(`${URL}api/budgets/setbudget`, { ...form, month });
      toast.success("Budget saved");
      setForm({ category: "", amount: "" });
      fetchBudgets(); // Refresh budget data
    } catch (err) {
      toast.error("Failed to save budget");
    }
  };

  // Combine budget and actual spending data for comparison
  const combinedData = budgets.map((b) => {
    const spendingMatch = spending.find((s) => s.category === b.category);
    return {
      category: b.category,
      budget: b.amount,
      spending: spendingMatch?.spending || 0,
    };
  });

  return (
    <div className="space-y-6">
      {/* Budget Setting Form */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold">Set Monthly Budget</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={form.category}
              onValueChange={(val) =>
                setForm((prev) => ({ ...prev, category: val }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Transport">Transport</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Educational">Educational</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Amount (₹)</Label>
            <Input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>
          <div>
            <Label>Month</Label>
            <Input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
        </div>
        <Button className="w-full sm:w-fit" onClick={handleSetBudget}>
          Save Budget
        </Button>
      </div>

      {/* Spending Insights */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Spending Insights</h2>
        {combinedData.length ? (
          <div className="space-y-2">
            {combinedData.map((data) => (
              <div key={data.category} className="flex justify-between">
                <span className="font-semibold">{data.category}</span>
                <span>
                  <span className="text-green-600">₹{data.spending}</span> /{" "}
                  <span className="text-red-600">₹{data.budget}</span>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            No data available for this month.
          </p>
        )}
      </div>
    </div>
  );
};

export default SetBudgetWithInsights;
