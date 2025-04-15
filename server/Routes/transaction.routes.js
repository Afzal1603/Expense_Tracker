const express = require("express");
const Transaction = require("../Model/Transaction");
const verifyToken = require("../Middleware/verifyToken");
const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  const { amount, date, description } = req.body;
  try {
    const transaction = new Transaction({
      user: req.user.userId,
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

router.get("/", verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.userId });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.status(200).json(transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    res.status(200).json("Transaction deleted successful");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
