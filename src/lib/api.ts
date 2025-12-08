import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_URL,
});
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.warn(error);
    return { data: { message: "Mock response" } };
  }
);
