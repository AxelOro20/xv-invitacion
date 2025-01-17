import { useState } from "react";
import "./UbicacionEvento.css";
import SalonImage from "../assets/salon.webp"; // Asegúrate de que la imagen esté en esta ruta
import Google_Maps from "../assets/google-maps-icon.webp";
import Waze from "../assets/waze-icon.webp";
import Ubi from "../assets/ubi.webp";

const UbicacionEventoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // Nuevo estado para el cierre del modal

  const googleMapsUrl = "https://maps.app.goo.gl/X7Fwr5uwAAYkApeL7";
  const wazeUrl =
    "https://www.waze.com/en/live-map/directions/salon-salamandra-22-de-diciembre-de-1860-iztapalapa?navigate=yes&place=w.170983618.1710032786.16325878&utm_campaign=default&utm_medium=lm_share_location&utm_source=waze_website";

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsClosing(true); // Activa la animación de cierre
    setTimeout(() => {
      setIsClosing(false); // Resetea el estado de cierre
      setIsOpen(false); // Cierra el modal completamente
    }, 1500); // Tiempo igual a la duración de la animación (1.5s)
  };

  return (
    <div className="ubicacion-modal-container">
      <h2 className="titulo_evento">Lugar y Ubicación</h2>
      <h3 className="titulo_salon">Salon Salamandra</h3>
      <img src={SalonImage} alt="Salón del evento" className="ubicacion-imagen" />
      <button className="ubicacion-boton-principal" onClick={handleOpen}>
        <img src={Ubi} alt="Ver mapa" />
        <span>Ver Mapa</span>
      </button>

      {isOpen && (
        <div className={`modal-overlay ${isOpen ? "show" : ""}`}>
          <div
            className={`modal-content ${isClosing ? "slide-out" : ""}`} // Cambia entre animaciones
          >
            <h2 className="modal-titulo">Ubicación del Evento</h2>
            <p className="modal-info">
              <strong>Fecha:</strong> Domingo, 16 de marzo de 2025, 4:30 PM
            </p>
            <p className="modal-info">
              <strong>Lugar:</strong> Salón SALAMANDRA, 22 de Diciembre de 1860
              1874, Leyes de Reforma 3ra Secc, Iztapalapa, 09310 Ciudad de México,
              CDMX.
            </p>
            <iframe
              className="modal-mapa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5255911161234!2d-99.06973378459803!3d19.38167938689816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fdae3a2429c5%3A0xbb3743181277f6fc!2sSALAMANDRA!5e0!3m2!1ses!2smx!4v1234567890123"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa del evento"
            ></iframe>
            <div className="modal-botones">
              <button
                className="modal-boton"
                onClick={() => window.open(googleMapsUrl, "_blank")}
              >
                <img src={Google_Maps} alt="Google Maps" />
                <span>Google Maps</span>
              </button>
              <button
                className="modal-boton"
                onClick={() => window.open(wazeUrl, "_blank")}
              >
                <img src={Waze} alt="Waze" />
                <span>Waze</span>
              </button>
            </div>

            <button className="modal-cerrar" onClick={handleClose}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UbicacionEventoModal;
