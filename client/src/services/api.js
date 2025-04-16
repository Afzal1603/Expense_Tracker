import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const addTransaction = (data, token) =>
  API.post("/transactions/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

export const fetchTransactions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetchi  ng transactions:", error);
    throw error;
  }
};

export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};
