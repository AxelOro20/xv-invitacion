import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SubirFotos.css";

interface Foto {
  id: string;
  url: string;
  nombreArchivo: string;
  fecha: string;
}

function SubirFotos() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFotoIndex, setSelectedFotoIndex] = useState<number | null>(null);

  const fetchFotos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "fotos"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Foto[];
      setFotos(data);
    } catch (error) {
      console.error("Error al obtener las fotos: ", error);
    }
  };

  useEffect(() => {
    fetchFotos();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) => file.size / (1024 * 1024) <= 5
    );

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Algunas imágenes exceden el tamaño máximo de 5 MB.");
    }

    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setFiles((prev) => [...prev, ...validFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleFileUpload = async () => {
    if (files.length === 0) {
      toast.error("Por favor, selecciona al menos un archivo.");
      return;
    }

    try {
      for (const file of files) {
        const uniqueFileName = `${Date.now()}-${file.name}`;
        const storage = getStorage();
        const storageRef = ref(storage, `fotos/${uniqueFileName}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const docRef = await addDoc(collection(db, "fotos"), {
          url: downloadURL,
          nombreArchivo: uniqueFileName,
          fecha: new Date().toISOString(),
        });

        setFotos((prevFotos) => [
          ...prevFotos,
          {
            id: docRef.id,
            url: downloadURL,
            nombreArchivo: uniqueFileName,
            fecha: new Date().toISOString(),
          },
        ]);
      }
      toast.success("Fotos subidas con éxito.");
      setFiles([]);
      setPreviews([]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al subir las fotos: ", error);
      toast.error("Hubo un problema al subir las fotos.");
    }
  };

  const handleDelete = async (foto: Foto) => {
    const storage = getStorage();
    const storageRef = ref(storage, `fotos/${foto.nombreArchivo}`);

    try {
      await deleteObject(storageRef);
      await deleteDoc(doc(db, "fotos", foto.id));
      setFotos((prevFotos) => prevFotos.filter((f) => f.id !== foto.id));
      toast.success("Foto eliminada con éxito.");
    } catch (error) {
      console.error("Error al eliminar la foto:", error);
      toast.error("Hubo un problema al eliminar la foto.");
    }
  };

  const openLightbox = (index: number) => {
    setSelectedFotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedFotoIndex(null);
  };

  const goToNextFoto = () => {
    setSelectedFotoIndex((prevIndex) =>
      prevIndex !== null && prevIndex < fotos.length - 1 ? prevIndex + 1 : 0
    );
  };

  const goToPrevFoto = () => {
    setSelectedFotoIndex((prevIndex) =>
      prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : fotos.length - 1
    );
  };

  const downloadFoto = () => {
    if (selectedFotoIndex !== null) {
      const foto = fotos[selectedFotoIndex];
      const link = document.createElement("a");
      link.href = foto.url;
      link.download = foto.nombreArchivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareFoto = async () => {
    if (selectedFotoIndex !== null) {
      const foto = fotos[selectedFotoIndex];
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Mira esta foto",
            text: "Compartiendo esta foto desde mi galería.",
            url: foto.url,
          });
        } catch (error) {
          console.error("Error al compartir la foto:", error);
          toast.error("No se pudo compartir la foto.");
        }
      } else {
        toast.info("Tu navegador no soporta la funcionalidad de compartir.");
      }
    }
  };

  return (
    <div className="container-subir-fotos">
      <ToastContainer />
      <button className="open-modal-button" onClick={() => setIsModalOpen(true)}>
        Subir Fotos
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsModalOpen(false)}>X</button>
            <div className="cargarfoto">
              <label htmlFor="file-upload" className="custom-upload-label">
                <span>📤 Elegir Archivos</span>
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept="image/*"
                multiple
              />
              <button onClick={handleFileUpload} className="upload-button">
                Subir Fotos
              </button>
            </div>

            <div className="preview-container">
              {previews.map((preview, index) => (
                <div key={index} className="preview-item">
                  <img src={preview} alt={`Vista previa ${index + 1}`} />
                  <button
                    className="delete-preview"
                    onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <h2 className="titulo-galeria">Galería de Fotos</h2>
      <div className="container-img">
        {fotos.map((foto, index) => (
          <div key={foto.id} className="box-img">
            <figure>
              <img
                src={foto.url}
                alt={foto.nombreArchivo}
                onClick={() => openLightbox(index)}
              />
            </figure>
            <button onClick={() => handleDelete(foto)}>X</button>
          </div>
        ))}
      </div>

      {selectedFotoIndex !== null && (
        <div className="lightbox">
          <button className="prev" onClick={goToPrevFoto}>{"<"}</button>
          <img
            src={fotos[selectedFotoIndex].url}
            alt={fotos[selectedFotoIndex].nombreArchivo}
          />
          <div className="actions">
            <button className="download" onClick={downloadFoto}>Descargar</button>
            <button className="share" onClick={shareFoto}>Compartir</button>
          </div>
          <button className="next" onClick={goToNextFoto}>{">"}</button>
          <button className="close" onClick={closeLightbox}>X</button>
        </div>
      )}
    </div>
  );
}

export default SubirFotos;
