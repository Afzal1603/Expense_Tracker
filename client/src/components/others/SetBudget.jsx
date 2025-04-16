import React, { useState } from "react";
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

const SetBudget = () => {
  const [form, setForm] = useState({ category: "", amount: "" });
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // 'YYYY-MM'

  const URL = import.meta.env.VITE_API_URL || "http://localhost:5000/";

  const handleSetBudget = async () => {
    if (!form.category || !form.amount) return toast.error("Fill all fields");

    try {
      await axios.post(`${URL}api/budgets/setbudget`, { ...form, month });
      toast.success("Budget saved");
      setForm({ category: "", amount: "" });
    } catch (err) {
      toast.error("Failed to save budget");
    }
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default SetBudget;
