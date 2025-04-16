const express = require("express");
const Transaction = require("../Model/Transaction");
const router = express.Router();

router.post("/create", async (req, res) => {
  const { amount, date, description } = req.body;
  try {
    const transaction = new Transaction({
      amount,
      date: new Date(date),
      description,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/gettransaction", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/deletetransaction/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json("Transaction deleted successful");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.put("/updatetransaction/:id", async (req, res) => {
  const { amount, date, description } = req.body;
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        amount,
        date,
        description,
      },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
