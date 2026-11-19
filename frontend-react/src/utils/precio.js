export const precioANumero = (precio) => {
  if (typeof precio === "number") return precio;
  if (!precio) return 0;

  const numero = Number(
    String(precio).replace(/[^\d.-]/g, "")
  );

  return Number.isFinite(numero) ? numero : 0;
};

export const formatearPrecio = (precio) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(precioANumero(precio));
};
