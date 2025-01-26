import axios from "axios";
// import { response } from "../../backend/server";

const apiServerUrl = "http://51.20.143.103:5000"; // Change the IP address to your backend server IP address

const apiClient = axios.create({
  baseURL: `${apiServerUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// API Client for user to send multi form data for add and update user
const userApiClient = axios.create({
  baseURL: `${apiServerUrl}/api/users`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

apiClient.interceptors.request.use(
  (response) => {
    return response;
  },
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

userApiClient.interceptors.request.use(
  (response) => {
    return response;
  },
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { apiClient, userApiClient };
