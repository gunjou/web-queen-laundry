const API_BASE_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// GET
export const getPayments = async () => {
  const res = await fetch(`${API_BASE_URL}/payments`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Gagal ambil payments");

  return await res.json();
};

// POST
export const createPayment = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/payments`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || "Gagal membuat payment");
  }

  return await res.json();
};
