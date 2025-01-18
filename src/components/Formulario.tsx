import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Importamos React-Toastify
import "react-toastify/dist/ReactToastify.css"; // Importamos los estilos
import { db } from "../firebase";
import "./Formulario.css";
import WhatsAppIcon from "../assets/whatsapp-icon.webp"; // Ruta del ícono de WhatsApp

function Formulario() {
  const [nombre, setNombre] = useState("");
  const [acompaniantes, setAcompaniantes] = useState<number>(0);
  const [asistira, setAsistira] = useState<string>("Asistiré");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const whatsappLink = "https://wa.me/+525510198619"; // Reemplaza con tu número de WhatsApp y mensaje

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nombre.trim()) {
      setError("El nombre no puede estar vacío.");
      toast.error("El nombre no puede estar vacío.");
      return;
    }
    if (acompaniantes < 0) {
      setError("El número de acompañantes no puede ser negativo.");
      toast.error("El número de acompañantes no puede ser negativo.");
      return;
    }
    if (nombre.length > 50) {
      setError("El nombre no debe exceder los 50 caracteres.");
      toast.error("El nombre no debe exceder los 50 caracteres.");
      return;
    }
    if (acompaniantes > 10) {
      setError("El número máximo de acompañantes es 10.");
      toast.error("El número máximo de acompañantes es 10.");
      return;
    }

    try {
      await addDoc(collection(db, "confirmaciones"), {
        nombre,
        acompaniantes,
        asistira,
        mensaje,
        fecha: new Date().toISOString(),
      });
      toast.success("¡Confirmación enviada exitosamente!");
      setTimeout(() => navigate("/confirmacion"), 2000);
    } catch (error) {
      console.error("Error al confirmar asistencia: ", error);
      toast.error("Hubo un error al enviar tu confirmación.");
      setError("Hubo un error al enviar tu confirmación.");
    }
  };

  return (
    <div className="formulario-container">
      <h1 className="Title">Confirmación de Asistencia</h1>
      <h2 className="mensaje-contacto">Me encantaría contar con tu presencia en este día especial, por favor confirma tu asistencia a la brevedad</h2>
      <h2 className="mensaje-contacto">¡Muchas Gracias!</h2>
      <form onSubmit={handleSubmit} className="formulario-form">
        <div className="formulario-campo">
          <label>Nombre y Apellido:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe tu nombre aquí"
          />
        </div>
        <div className="formulario-campo">
          <label>Número de acompañantes:</label>
          <input
            type="number"
            value={acompaniantes}
            onChange={(e) => setAcompaniantes(Number(e.target.value))}
            placeholder="0"
          />
        </div>
        <div className="formulario-campo">
          <label>¿Asistirá al evento?</label>
          <div className="formulario-radio-group">
            <label>
              <input
                type="radio"
                value="Asistiré"
                checked={asistira === "Asistiré"}
                onChange={(e) => setAsistira(e.target.value)}
              />
              Asistiré
            </label>
            <label>
              <input
                type="radio"
                value="No asistiré"
                checked={asistira === "No asistiré"}
                onChange={(e) => setAsistira(e.target.value)}
              />
              No asistiré
            </label>
          </div>
        </div>
        <div className="formulario-campo">
          <label>Mensaje o duda:</label>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe un mensaje bonito o una duda aquí"
            rows={4}
          />
        </div>
        <button type="submit" className="formulario-boton">
          Confirmar
        </button>
      </form>
      {error && <p className="formulario-error">{error}</p>}
      <section className="contacto">
      <h2 className="titulo-contacto">Contacto</h2>
      <p className="mensaje-contacto">También puedes confirmar vía WhatsApp.</p>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="boton-whatsapp">
        <img src={WhatsAppIcon} alt="WhatsApp" className="icono-whatsapp" />
        Confirmar con Dinorah 
      </a>
    </section>
    </div>
  );
}

export default Formulario;
