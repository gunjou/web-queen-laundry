export const formatRupiah = (value) => {
  if (!value) return "";

  return new Intl.NumberFormat("id-ID").format(value);
};

export const parseRupiah = (value) => {
  return value.replace(/[^0-9]/g, "");
};
