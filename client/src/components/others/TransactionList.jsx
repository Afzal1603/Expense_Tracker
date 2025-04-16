import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const URL = import.meta.env.VITE_API_URL || "http://localhost:5000/";

  const fetchData = async () => {
    try {
      const res = await axios.get(`${URL}api/transactions/gettransaction`);
      setTransactions(res.data);
    } catch (error) {
      toast.error("Failed to load transactions");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}api/transactions/deletetransaction/${id}`);
      toast.success("Transaction deleted");
      setTransactions((prev) => prev.filter((tx) => tx._id !== id));
    } catch (error) {
      toast.error("Failed to delete transaction");
    }
  };

  const openEditModal = (tx) => {
    setEditData({ ...tx });
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${URL}api/transactions/updatetransaction/${editData._id}`,
        editData
      );
      toast.success("Transaction updated");
      setTransactions((prev) =>
        prev.map((tx) => (tx._id === editData._id ? res.data : tx))
      );
      setEditModalOpen(false);
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (!transactions?.length) {
    return <p className="text-muted-foreground">No transactions found.</p>;
  }

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div
          key={tx._id}
          className="bg-white rounded-2xl shadow p-4 flex items-center justify-between"
        >
          {/* Description */}
          <div className="flex-1 pr-4">
            <p className="text-lg font-medium">{tx.description}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(tx.date).toLocaleDateString()}
            </p>
            <p className="text-xs text-muted-foreground">{tx.category}</p>
          </div>

          {/* Amount */}
          <div className="flex-1 text-center">
            <p
              className={`text-lg font-semibold ${
                tx.amount >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ₹ {tx.amount.toFixed(2)}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => openEditModal(tx)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(tx._id)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          {editData && (
            <div className="space-y-4">
              <div>
                <Label>Description</Label>
                <Input
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                />
              </div>
              <div>
                <Label>Amount (₹)</Label>
                <Input
                  name="amount"
                  type="number"
                  value={editData.amount}
                  onChange={handleEditChange}
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  name="date"
                  type="date"
                  value={editData.date.split("T")[0]}
                  onChange={handleEditChange}
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={editData.category}
                  onValueChange={(value) =>
                    setEditData((prev) => ({ ...prev, category: value }))
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
                    <SelectItem value="Educational"> Educational</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={handleUpdate}>
                Update
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionList;
