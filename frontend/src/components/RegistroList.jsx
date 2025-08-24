import { useEffect, useState } from "react";
import { fetchRegistros, fetchRegistrosFiltrados } from "../api/registros";

export default function RegistroList() {
  const [registros, setRegistros] = useState([]);
  const [id, setId] = useState("");
  const [fecha, setFecha] = useState("");
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  
  useEffect(() => {
    const cargar = async () => {
      setLoading(true);
      try {
        const data = await fetchRegistros();
        setRegistros(data);
      } catch (err) {
        console.error("Error al traer registros:", err);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  
  const handleFiltrar = async () => {
    setLoading(true);
    try {
      const data = await fetchRegistrosFiltrados({ id, fecha, categoria });
      setRegistros(data);
    } catch (err) {
      console.error("Error filtrando registros:", err);
      setRegistros([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setId("");
    setFecha("");
    setCategoria("");
    setLoading(true);
    try {
      const data = await fetchRegistros();
      setRegistros(data);
    } catch (err) {
      console.error("Error cargando registros:", err);
      setRegistros([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVerDescripcion = (descripcion) => {
    setModalContent(descripcion);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Beneficiarios</h1>

      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Filtrar por ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          disabled={fecha !== "" || categoria !== ""}
          style={{ marginRight: "0.5rem", padding: "0.3rem", width: "80px", textAlign: "center" }}
        />
        <input
          type="text"
          placeholder="Filtrar por fecha (ej: 2022)"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          disabled={id !== ""}
          style={{ marginRight: "0.5rem", padding: "0.3rem", width: "100px", textAlign: "center" }}
        />
        <input
          type="text"
          placeholder="Filtrar por categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          disabled={id !== ""}
          style={{ marginRight: "0.5rem", padding: "0.3rem", width: "140px", textAlign: "center" }}
        />
        <button onClick={handleFiltrar} style={{ marginRight: "0.5rem", padding: "0.3rem 0.6rem" }}>
          Filtrar
        </button>
        <button onClick={handleReset} style={{ padding: "0.3rem 0.6rem" }}>
          Reset
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            {["ID", "Categoría", "Conjunto de Datos", "Descripción", "Publicado", "Dato Abierto", "Fecha Actualización"].map(
              (header) => (
                <th key={header} style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {registros.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "1rem" }}>
                No hay registros para mostrar
              </td>
            </tr>
          ) : (
            registros.map((r) => (
              <tr key={r.id} style={{ textAlign: "center" }}>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{r.id}</td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{r.categoria}</td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{r.conjunto_datos}</td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                  <button
                    onClick={() => handleVerDescripcion(r.descripcion)}
                    style={{
                      padding: "0.2rem 0.4rem",
                      cursor: "pointer",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                    }}
                  >
                    Ver
                  </button>
                </td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{r.publicado}</td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{r.dato_abierto}</td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{r.fecha_actualizacion}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "8px",
              maxWidth: "500px",
              width: "90%",
            }}
          >
            <h3>Descripción</h3>
            <p>{modalContent}</p>
            <button
              onClick={closeModal}
              style={{
                marginTop: "1rem",
                padding: "0.3rem 0.6rem",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
