import { useState, useRef } from "react";
import "./BotonMusica.css";
import IconPlay from "../assets/icon-play.gif"; // Icono para música detenida
import IconPause from "../assets/icon-pause.webp"; // Icono para música sonando
import musicaFondo from "../assets/Brook Binks sake Violin Version.mp3"; // Archivo de música

const BotonMusica = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Música inicia como detenida
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((error) => {
            console.warn("Error al reproducir el audio:", error);
          });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src={musicaFondo} type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
      <button className="boton-musica" onClick={toggleMusic}>
        <img
          src={isPlaying ? IconPlay : IconPause }
          alt={isPlaying ? "Detener música" : "Reproducir música"}
          className="icono-musica"
        />
      </button>
    </div>
  );
};

export default BotonMusica;
