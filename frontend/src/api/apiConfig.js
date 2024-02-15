import axios from "axios";

export const API_BASE_URL = "http://localhost:8080";

export const getApi = () => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      "Content-Type": "application/json",
    },
  });
};
