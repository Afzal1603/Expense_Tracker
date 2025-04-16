import React, { useState } from "react";
import { addTransaction } from "../../services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transaction = {
      amount: parseFloat(amount),
      date,
      description,
      category,
    };

    try {
      await addTransaction(transaction);
      toast.success("Transaction added successfully");

      // Reset form
      setAmount("");
      setDate("");
      setDescription("");
      setCategory("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add transaction");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-10 max-w-md mx-auto space-y-4 bg-white p-6 rounded-2xl shadow-md"
      >
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Transport">Transport</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Entertainment"> Entertainment</SelectItem>
              <SelectItem value="Educational"> Educational</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">
          Add Transaction
        </Button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default TransactionForm;
