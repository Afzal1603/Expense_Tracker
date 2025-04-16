import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

export const addTransaction = (data) =>
  API.post("/api/transactions/create", data);
