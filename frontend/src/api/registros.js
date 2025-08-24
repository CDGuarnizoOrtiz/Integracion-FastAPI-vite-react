
const API_URL = "http://localhost:8000/registros";


export const fetchRegistros = async () => {
  const response = await fetch(`${API_URL}/`);
  if (!response.ok) {
    throw new Error("Error al obtener registros");
  }
  return await response.json();
};

export const fetchRegistrosFiltrados = async ({ id, fecha, categoria }) => {
  const params = new URLSearchParams();

  if (id) params.append("id", id);
  if (fecha) params.append("fecha", fecha);
  if (categoria) params.append("categoria", categoria);

  const response = await fetch(`${API_URL}/filtrar?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Error al filtrar registros");
  }
  return await response.json();
};
