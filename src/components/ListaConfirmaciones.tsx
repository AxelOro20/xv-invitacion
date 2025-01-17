import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// Define el tipo de los datos de confirmación
interface Confirmacion {
  id: string;
  nombre: string;
  acompaniantes: number;
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
          ...data, // Copia todas las propiedades de los datos del documento
          id: doc.id, // Añade la propiedad id desde el documento Firestore
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
    <div>
      <h1>Lista de Confirmaciones</h1>
      <button onClick={() => setOrden("nombre")}>Ordenar por Nombre</button>
      <button onClick={() => setOrden("fecha")}>Ordenar por Fecha</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acompañantes</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {confirmacionesOrdenadas.map((conf) => (
            <tr key={conf.id}>
              <td>{conf.nombre}</td>
              <td>{conf.acompaniantes}</td>
              <td>{new Date(conf.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaConfirmaciones;
