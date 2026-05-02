const API_BASE_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// ==============================
// GET ALL ORDERS
// ==============================
export const getOrders = async () => {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data order");
  }

  return await res.json();
};

// ==============================
// GET ORDER DETAIL
// ==============================
export const getOrderById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil detail order");
  }

  return await res.json();
};

// ==============================
// CREATE ORDER
// ==============================
export const createOrder = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Gagal menambahkan order");
  }

  return await res.json();
};

// ==============================
// UPDATE ORDER
// ==============================
export const updateOrder = async (id, payload) => {
  const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Gagal mengubah order");
  }

  return await res.json();
};

// ==============================
// UPDATE STATUS ORDER
// ==============================
export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      status: status,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Gagal update status order");
  }

  return await res.json();
};

// ==============================
// DELETE ORDER
// ==============================
export const deleteOrder = async (id) => {
  const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Gagal menghapus order");
  }

  return true;
};
