const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
const connectDb = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};

// Connect to MongoDB
module.exports = connectDb;
