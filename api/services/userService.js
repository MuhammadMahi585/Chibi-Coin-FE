const { apiClient, userApiClient } = require("../apiClient");

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await apiClient.post("/users/login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData) => {
  // const formData = new FormData();

  // for (const key in userData) {
  //   formData.append(key, userData[key]);
  // }
  // formData.append("picture", picture);

  try {
    const response = await apiClient.post("/users", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await apiClient.get("/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserFromEmail = async (email) => {
  try {
    const response = await apiClient.get(`/users/email/${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editUser = async (id, userData, picture) => {
  try {
    const response = await userApiClient.put(`/${id}`, userData, picture);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeUser = async (id) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserNotifications = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}/notifications`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserTransactions = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}/transactions`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserBudgets = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}/budgets`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserGoals = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}/goals`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await userApiClient.post("/verify-token", { token });
    return response.data;
  } catch (error) {
    throw error;
  }
};
