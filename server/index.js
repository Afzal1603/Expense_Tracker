require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./db/db");
const transactionRouter = require("./Routes/transaction.routes");
const budgetRoutes = require("./Routes/budget.routes");
const cookieParser = require("cookie-parser");

const app = express();
connectDb();

const allowedOrigins = [
  "http://localhost:5173",
  "https://expense-tracker-ten-ruby.vercel.app",
];
app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/api/transactions", transactionRouter);
app.use("/api/budgets", budgetRoutes);

const PORT = process.env.PORT || 5000;

// Routes
// const transactionRoutes = require("./routes/transactions");
// app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
