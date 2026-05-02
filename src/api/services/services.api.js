import api from "../api";

// =========================
// GET ALL SERVICES
// =========================
export const getServices = async (params = {}) => {
  const response = await api.get("/services", {
    params,
  });

  return response.data;
};

// =========================
// GET DETAIL SERVICE
// =========================
export const getServiceById = async (id) => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};

// =========================
// CREATE SERVICE
// =========================
export const createService = async (payload) => {
  const response = await api.post("/services", payload);
  return response.data;
};

// =========================
// UPDATE SERVICE
// =========================
export const updateService = async (id, payload) => {
  const response = await api.put(`/services/${id}`, payload);
  return response.data;
};

// =========================
// DELETE SERVICE
// =========================
export const deleteService = async (id) => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
};
