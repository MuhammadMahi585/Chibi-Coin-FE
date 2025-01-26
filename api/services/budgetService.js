const { apiClient } = require("../apiClient");

export const createBudget = async (budgetData) => {
  try {
    const response = await apiClient.post("/budgets", budgetData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBudgets = async () => {
  try {
    const response = await apiClient.get("/budgets");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBudget = async (id) => {
  try {
    const response = await apiClient.get(`/budgets/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editBudget = async (id, budgetData) => {
  try {
    const response = await apiClient.put(`/budgets/${id}`, budgetData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeBudget = async (id) => {
  try {
    const response = await apiClient.delete(`/budgets/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
