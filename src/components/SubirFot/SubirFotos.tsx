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

  useEffect(() => {
    fetchFotos();
  }, []);

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
      toast.error("Hubo un problema al cargar las fotos.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) => file.size / (1024 * 1024) <= 5
    );

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Algunas imágenes exceden el tamaño máximo de 5 MB.");
    }

    const newFiles = validFiles.filter(
      (file) => !files.some((f) => f.name === file.name)
    );

    if (newFiles.length !== validFiles.length) {
      toast.warning("Se excluyeron archivos duplicados.");
    }

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setFiles((prev) => [...prev, ...newFiles]);
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
      previews.forEach((preview) => URL.revokeObjectURL(preview));
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

  return (
    <div className="container-subir-fotos">
      <ToastContainer />
      <button
        className="open-modal-button"
        onClick={() => setIsModalOpen(true)}
        aria-label="Abrir modal para subir fotos"
      >
        Subir Fotos
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
              aria-label="Cerrar modal"
            >
              X
            </button>
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
                    onClick={() => {
                      setFiles((prev) => prev.filter((_, i) => i !== index));
                      setPreviews((prev) => {
                        URL.revokeObjectURL(prev[index]);
                        return prev.filter((_, i) => i !== index);
                      });
                    }}
                    aria-label="Eliminar vista previa"
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
        {fotos.map((foto) => (
          <div key={foto.id} className="box-img">
            <figure>
              <img src={foto.url} alt={foto.nombreArchivo} />
            </figure>
            <button
              onClick={() => handleDelete(foto)}
              aria-label="Eliminar foto"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubirFotos;
