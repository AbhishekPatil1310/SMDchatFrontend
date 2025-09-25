// src/api/ContactApi.js
import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/contact`, // adjust if needed
  withCredentials: true,
});

export const sendMessage = (data) => API.post("/sendMessage", data);
