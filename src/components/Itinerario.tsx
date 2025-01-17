import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import "./Itinerario.css";

function Itinerario() {
  const actividades = [
    { hora: "4:30 PM", actividad: "Recepción", icono: "🌟" },
    { hora: "5:00 PM", actividad: "Ceremonia Religiosa", icono: "⛪" },
    { hora: "5:30 PM", actividad: "Recepción en el Salón Salamandra", icono: "🎉" },
    { hora: "6:00 PM", actividad: "Cocktail de bienvenida", icono: "🍸" },
    { hora: "7:00 PM", actividad: "Cena formal", icono: "🍽️" },
    { hora: "8:00 PM", actividad: "VALS", icono: "💃" },
    { hora: "9:30 PM", actividad: "Baile y Bantucada", icono: "🕺" },
    { hora: "12:00 AM", actividad: "Final", icono: "🎆" },
  ];

  // Inicialización de AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones en milisegundos
      offset: 100, // Distancia desde el viewport para activar
    });
  }, []);

  return (
    <div className="itinerario-container">
      <h1 className="itinerario-titulo" data-aos="fade-down">
        Itinerario del Evento
      </h1>
      <ul className="itinerario-lista">
        {actividades.map((item, index) => (
          <li
            key={index}
            className="itinerario-item"
            data-aos="fade-up"
            data-aos-delay={index * 150} // Retraso progresivo
          >
            <span className="itinerario-icono">{item.icono}</span>
            <span className="hora">{item.hora}</span>
            <span className="actividad">{item.actividad}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Itinerario;
