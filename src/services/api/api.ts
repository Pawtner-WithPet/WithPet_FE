import axios from "axios";
import { API_BASE_URL } from "@env";

console.log("API_BASE_URL from @env:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
