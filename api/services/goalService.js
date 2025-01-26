const { apiClient } = require("../apiClient");

export const createGoal = async (goalData) => {
  try {
    const response = await apiClient.post("/goals", goalData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGoals = async () => {
  try {
    const response = await apiClient.get("/goals");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGoal = async (id) => {
  try {
    const response = await apiClient.get(`/goals/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editGoal = async (id, goalData) => {
  try {
    const response = await apiClient.put(`/goals/${id}`, goalData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeGoal = async (id) => {
  try {
    const response = await apiClient.delete(`/goals/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
