const express = require("express");
const Budget = require("../Model/Budget");
const router = express.Router();
const Transaction = require("../Model/Transaction");

router.get("/compare", async (req, res) => {
  const { month, year } = req.query;

  if (!month || !year) {
    return res.status(400).json({ error: "Month and year are required" });
  }

  try {
    const startDate = new Date(year, month - 1, 1); // e.g., 2025-03-01
    const endDate = new Date(year, month, 1); // e.g., 2025-04-01

    const budgets = await Budget.find({
      month: `${year}-${month.toString().padStart(2, "0")}`,
    });

    const txns = await Transaction.find({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    const actuals = {};
    txns.forEach((tx) => {
      actuals[tx.category] = (actuals[tx.category] || 0) + tx.amount;
    });

    const data = budgets.map((b) => ({
      category: b.category,
      budget: b.amount,
      actual: actuals[b.category] || 0,
    }));

    res.json(data);
  } catch (err) {
    console.error("Compare route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/allbudgets", async (req, res) => {
  try {
    const budgets = await Budget.find();
    const groupedBudgets = {};

    budgets.forEach((b) => {
      if (!groupedBudgets[b.month]) {
        groupedBudgets[b.month] = [];
      }
      groupedBudgets[b.month].push({ category: b.category, amount: b.amount });
    });

    const transactions = await Transaction.find();
    const actualsGrouped = {};

    transactions.forEach((tx) => {
      const month = tx.date.toISOString().slice(0, 7);
      if (!actualsGrouped[month]) {
        actualsGrouped[month] = {};
      }

      if (!actualsGrouped[month][tx.category]) {
        actualsGrouped[month][tx.category] = 0;
      }

      actualsGrouped[month][tx.category] += tx.amount;
    });

    const result = [];

    const allMonths = new Set([
      ...Object.keys(groupedBudgets),
      ...Object.keys(actualsGrouped),
    ]);

    allMonths.forEach((month) => {
      const monthBudgets = groupedBudgets[month] || [];
      const monthActuals = Object.entries(actualsGrouped[month] || {}).map(
        ([category, amount]) => ({ category, amount })
      );

      result.push({
        month,
        budgets: monthBudgets,
        actuals: monthActuals,
      });
    });

    // Sort months in ascending order
    result.sort((a, b) => a.month.localeCompare(b.month));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

router.post("/setbudget", async (req, res) => {
  const { category, amount, month } = req.body;

  try {
    let existing = await Budget.findOne({ category, month });

    if (existing) {
      existing.amount = amount;
      await existing.save();
      return res.status(200).json(existing);
    }

    const newBudget = new Budget({ category, amount, month });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ error: "Failed to set budget" });
  }
});

router.get("/getbudgets", async (req, res) => {
  const { month } = req.query;
  try {
    const budgets = await Budget.find({ month });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
});

module.exports = router;
