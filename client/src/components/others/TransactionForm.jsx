import React, { useState } from "react";
import { addTransaction } from "../../services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
// import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const TransactionForm = () => {
  const user = useSelector((state) => state.auth.user);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transaction = {
      amount: parseFloat(amount),
      date,
      description,
    };
    try {
      await addTransaction(transaction);
      toast.success("Transaction added successfully");
      setAmount("");
      setDate("");
      setDescription("");
    } catch (error) {
      console.log(error);
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

        <Button type="submit" className="w-full">
          Add Transaction
        </Button>
      </form>
      <ToastContainer />
    </>
  );
};

export default TransactionForm;
