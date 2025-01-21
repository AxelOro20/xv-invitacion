import { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import "./SubirFotos.css";

interface Props {
  setTriggerRefresh: () => void;
}

const SubirFotos = ({ setTriggerRefresh }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter((file) => file.size / (1024 * 1024) <= 5);

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
      const storage = getStorage();
      for (const file of files) {
        const uniqueName = `${Date.now()}-${file.name}`;
        const storageRef = ref(storage, `fotos/${uniqueName}`);
        await uploadBytes(storageRef, file);

        await addDoc(collection(db, "fotos"), {
          nombreArchivo: uniqueName,
          fecha: new Date().toISOString(),
        });
      }
      toast.success("Fotos subidas con éxito.");
      setFiles([]);
      setPreviews([]);
      setTriggerRefresh(); // Notifica a la galería
    } catch (error) {
      console.error("Error al subir las fotos:", error);
      toast.error("Hubo un problema al subir las fotos.");
    }
  };

  return (
    <div className="subir-fotos-container">
      <h2 className="subir-fotos-titulo">Subir Fotos</h2>
      <input type="file" accept="image/*" multiple onChange={handleFileChange} />
      <div className="preview-container">
        {previews.map((preview, index) => (
          <div key={index} className="preview-item">
            <img src={preview} alt={`Vista previa ${index}`} />
            <button
              onClick={() => {
                setFiles((prev) => prev.filter((_, i) => i !== index));
                setPreviews((prev) => prev.filter((_, i) => i !== index));
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleFileUpload} className="upload-btn">
        Subir Fotos
      </button>
    </div>
  );
};

export default SubirFotos;
