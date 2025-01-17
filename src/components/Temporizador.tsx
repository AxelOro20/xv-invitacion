import { useEffect, useState } from "react";
import "./Temporizador.css";

const Temporizador = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-03-16T16:30:00");
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="temporizador-container">
      <h1 className="temporizador-titulo">¡Cuenta regresiva para el gran día!</h1>
      <div className="temporizador-caja">
        <div className="temporizador-elemento">
          <span className="temporizador-numero animated">{timeLeft.days}</span>
          <span className="temporizador-label">Días</span>
        </div>
        <div className="temporizador-separador animated">:</div>
        <div className="temporizador-elemento">
          <span className="temporizador-numero animated">{timeLeft.hours}</span>
          <span className="temporizador-label">Horas</span>
        </div>
        <div className="temporizador-separador animated">:</div>
        <div className="temporizador-elemento">
          <span className="temporizador-numero animated">{timeLeft.minutes}</span>
          <span className="temporizador-label">Minutos</span>
        </div>
        <div className="temporizador-separador animated">:</div>
        <div className="temporizador-elemento">
          <span className="temporizador-numero animated">{timeLeft.seconds}</span>
          <span className="temporizador-label">Segundos</span>
        </div>
      </div>
    </div>
  );
};

export default Temporizador;
