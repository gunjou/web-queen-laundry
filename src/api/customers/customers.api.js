import api from "../api";

// =========================
// GET ALL CUSTOMERS
// =========================
export const getCustomers = async (params = {}) => {
  const response = await api.get("/customers", {
    params,
  });

  return response.data;
};

// =========================
// GET DETAIL CUSTOMER
// =========================
export const getCustomerById = async (id) => {
  const response = await api.get(`/customers/${id}`);
  return response.data;
};

// =========================
// CREATE CUSTOMER
// =========================
export const createCustomer = async (payload) => {
  const response = await api.post("/customers", payload);
  return response.data;
};

// =========================
// UPDATE CUSTOMER
// =========================
export const updateCustomer = async (id, payload) => {
  const response = await api.put(`/customers/${id}`, payload);
  return response.data;
};

// =========================
// DELETE CUSTOMER
// =========================
export const deleteCustomer = async (id) => {
  const response = await api.delete(`/customers/${id}`);
  return response.data;
};
