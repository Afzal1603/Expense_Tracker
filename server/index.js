require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./db/db");
const transactionRouter = require("./Routes/transaction.routes");

const cookieParser = require("cookie-parser");

const app = express();
connectDb();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/transactions", transactionRouter);

const PORT = process.env.PORT || 5000;

// Routes
// const transactionRoutes = require("./routes/transactions");
// app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
