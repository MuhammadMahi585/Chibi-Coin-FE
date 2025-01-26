import { apiClient } from "../apiClient";

export const createTransaction = async (transactionData) => {
  try {
    const response = await apiClient.post("/transactions", transactionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTransactions = async () => {
  try {
    const response = await apiClient.get("/transactions");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTransaction = async (id) => {
  try {
    const response = await apiClient.get(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editTransaction = async (id, transactionData) => {
  try {
    const response = await apiClient.put(
      `/transactions/${id}`,
      transactionData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeTransaction = async (id) => {
  try {
    const response = await apiClient.delete(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
