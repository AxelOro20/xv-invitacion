import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./ListaConfirmaciones.css";

interface Confirmacion {
  id: string;
  nombre: string;
  acompaniantes: number;
  asistira: string;
  mensaje: string;
  fecha: string;
}

function ListaConfirmaciones() {
  const [confirmaciones, setConfirmaciones] = useState<Confirmacion[]>([]);
  const [orden, setOrden] = useState("nombre");

  useEffect(() => {
    const fetchConfirmaciones = async () => {
      const querySnapshot = await getDocs(collection(db, "confirmaciones"));
      const data = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Confirmacion;
        return {
          ...data,
          id: doc.id,
        };
      });
      setConfirmaciones(data);
    };

    fetchConfirmaciones();
  }, []);

  const confirmacionesOrdenadas = [...confirmaciones].sort((a, b) => {
    if (orden === "nombre") {
      return a.nombre.localeCompare(b.nombre);
    }
    return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
  });

  return (
    <div className="lista-confirmaciones-container">
      <h1 className="titulo">Lista de Confirmaciones</h1>
      <div className="orden-buttons">
        <button
          onClick={() => setOrden("nombre")}
          className={orden === "nombre" ? "active" : ""}
        >
          Ordenar por Nombre
        </button>
        <button
          onClick={() => setOrden("fecha")}
          className={orden === "fecha" ? "active" : ""}
        >
          Ordenar por Fecha
        </button>
      </div>
      <div className="tabla-wrapper">
        <table className="confirmaciones-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Num. Acom</th>
              <th>Asistirá</th>
              <th>Mensaje</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {confirmacionesOrdenadas.map((conf) => (
              <tr key={conf.id}>
                <td>{conf.nombre}</td>
                <td>{conf.acompaniantes}</td>
                <td>{conf.asistira}</td>
                <td className="mensaje-columna">
                  <span>{conf.mensaje || "N/A"}</span>
                </td>
                <td>{new Date(conf.fecha).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaConfirmaciones;
