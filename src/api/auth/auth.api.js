import api from "../client";

export const loginRequest = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};
