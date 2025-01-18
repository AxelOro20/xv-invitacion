import "./Agendar.css";
import GoogleIcon from "../assets/google-calendar.webp"; // Reemplaza con el ícono de Google Calendar
import OutlookIcon from "../assets/outlook-calendar.webp"; // Reemplaza con el ícono de Outlook
import AppleIcon from "../assets/apple-calendar.webp"; // Reemplaza con el ícono de Apple Calendar

const Agendar = () => {
    // Enlaces de los calendarios con un evento predefinido
    const googleCalendarLink = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mis+XV+de+Arantza&dates=20250316T220000Z/20250317T055900Z&details=Celebracion+de+mis+XV&location=Salon+Salamandra,+CDMX";
    const outlookCalendarLink = "https://outlook.live.com/calendar/0/deeplink/compose?subject=Mis+XV+de+Arantza&body=Celebracion+de+mis+XV&location=Salon+Salamandra,+CDMX&startdt=2025-03-16T22:00:00Z&enddt=2025-03-17T05:59:00Z&path=/calendar/action/compose";
    const appleCalendarLink = "data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:Mis+XV+de+Arantza%0ADESCRIPTION:Celebracion+de+mis+XV%0ALOCATION:Salon+Salamandra,+CDMX%0ADTSTART:20250316T220000Z%0ADTEND:20250317T055900Z%0AEND:VEVENT%0AEND:VCALENDAR";

  
    return (
      <section className="agendar">
        <h2 className="titulo-agendar">¡Qué no se te olvide!</h2>
        <p className="mensaje-agendar">Marca la fecha en tu calendario para no perdértelo.</p>
        <div className="opciones-agendar">
          <a href={googleCalendarLink} target="_blank" rel="noopener noreferrer" className="boton-agendar">
            <img src={GoogleIcon} alt="Google Calendar" className="icono-agendar" />
            Agregar
          </a>
          <a href={outlookCalendarLink} target="_blank" rel="noopener noreferrer" className="boton-agendar">
            <img src={OutlookIcon} alt="Outlook Calendar" className="icono-agendar" />
            Agregar
          </a>
          <a href={appleCalendarLink} download="event.ics" className="boton-agendar">
            <img src={AppleIcon} alt="Apple Calendar" className="icono-agendar" />
            Agregar
          </a>
        </div>
      </section>
    );
  };
  
  export default Agendar;