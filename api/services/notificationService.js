const { apiClient } = require("../apiClient");

export const createNotification = async (notificationData) => {
  try {
    const response = await apiClient.post("/notifications", notificationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNotifications = async () => {
  try {
    const response = await apiClient.get("/notifications");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNotification = async (id) => {
  try {
    const response = await apiClient.get(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editNotification = async (id, notificationData) => {
  try {
    const response = await apiClient.put(
      `/notifications/${id}`,
      notificationData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeNotification = async (id) => {
  try {
    const response = await apiClient.delete(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
