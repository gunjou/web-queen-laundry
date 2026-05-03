import api from "../api";

export const getRevenueReport = async (params) => {
  const { data } = await api.get("/reports/revenue", {
    params,
  });

  return data;
};
