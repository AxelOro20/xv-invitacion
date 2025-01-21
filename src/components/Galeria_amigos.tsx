import { useEffect, useState, useCallback } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import "./Galeria_amigos.css";

interface Foto {
  id: string;
  url: string;
  nombreArchivo: string;
}

const Galeria = ({ triggerRefresh }: { triggerRefresh: number }) => {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [selectedFotoIndex, setSelectedFotoIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchFotos = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "fotos"));
      const data: Foto[] = [];

      for (const docItem of querySnapshot.docs) {
        const { nombreArchivo } = docItem.data();
        const storage = getStorage();
        const storageRef = ref(storage, `fotos/${nombreArchivo}`);
        try {
          const url = await getDownloadURL(storageRef);
          data.push({ id: docItem.id, url, nombreArchivo });
        } catch (err) {
          console.warn(`No se pudo cargar la imagen: ${nombreArchivo}`, err);
          await deleteDoc(doc(db, "fotos", docItem.id));
          console.log(`Referencia huérfana eliminada: ${nombreArchivo}`);
        }
      }

      setFotos(data);
    } catch (error) {
      console.error("Error al cargar las fotos:", error);
      setError("Hubo un problema al cargar las fotos.");
    }
  }, []);

  useEffect(() => {
    fetchFotos();
  }, [triggerRefresh]);

  const goToNextFoto = useCallback(() => {
    if (selectedFotoIndex !== null) {
      setSelectedFotoIndex((prev) => (prev! + 1) % fotos.length);
    }
  }, [selectedFotoIndex, fotos.length]);

  const goToPrevFoto = useCallback(() => {
    if (selectedFotoIndex !== null) {
      setSelectedFotoIndex((prev) =>
        prev === 0 ? fotos.length - 1 : prev! - 1
      );
    }
  }, [selectedFotoIndex, fotos.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedFotoIndex !== null) {
        if (e.key === "ArrowRight") {
          goToNextFoto();
        } else if (e.key === "ArrowLeft") {
          goToPrevFoto();
        } else if (e.key === "Escape") {
          setSelectedFotoIndex(null);
        }
      }
    },
    [selectedFotoIndex, goToNextFoto, goToPrevFoto]
  );

  useEffect(() => {
    if (selectedFotoIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFotoIndex, handleKeyDown]);

  return (
    <div className="galeria-container">
      <h1 className="galeria-titulo">Galería de Fotos</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="galeria-grid">
        {fotos.map((foto, index) => (
          <div
            key={foto.id}
            className="galeria-item"
            onClick={() => setSelectedFotoIndex(index)}
          >
            <img src={foto.url} alt={foto.nombreArchivo} />
            <button
              className="download-btn"
              onClick={(e) => {
                e.stopPropagation();
                const link = document.createElement("a");
                link.href = foto.url;
                link.download = foto.nombreArchivo;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Descargar
            </button>
          </div>
        ))}
      </div>

      {selectedFotoIndex !== null && (
        <div className="lightbox">
          <button className="prev" onClick={goToPrevFoto}>
            {"<"}
          </button>
          <img
            src={fotos[selectedFotoIndex].url}
            alt={fotos[selectedFotoIndex].nombreArchivo}
          />
          <button className="next" onClick={goToNextFoto}>
            {">"}
          </button>
          <button
            className="close"
            onClick={() => setSelectedFotoIndex(null)}
            style={{ top: "10px", right: "10px" }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Galeria;
