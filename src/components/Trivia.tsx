import { useState, useEffect } from "react";
import "./Trivia.css";

// Definimos una interfaz para las preguntas
interface Pregunta {
  id: number;
  pregunta: string;
  opciones: string[];
  correcta: number;
}

const preguntasOriginales = [
    {
      id: 1,
      pregunta: "¿Cuántos meses tenía mi mamá de embarazada, cuando supo que venía en camino?",
      opciones: ["2 meses", "5 meses", "Soy Adoptada", "ninguna de la anteriores"],
      correcta: 1, // Índice de la respuesta correcta (0-based)
    },
    {
      id: 2,
      pregunta: "¿Cuál es mi serie favorita de ciencia ficción?",
      opciones: ["Alice in Borderland", "Arcane", "The Umbrella Academy", "Stranger things"],
      correcta: 0,
    },
     {
      id: 3,
      pregunta: "¿Cuántos hermanos tengo?",
      opciones: ["3", "6", "2", "1"],
      correcta: 2,
    },
    {
     id: 4,
     pregunta: "¿Cuál es mi hobbie?",
     opciones: ["Cantar", "Dibujar", "Comer", "Leer"],
     correcta: 1,
     },
    {
     id: 5,
     pregunta: "¿Cuántas mascotas tengo?",
     opciones: ["2", "10", "5", "7"],
     correcta: 3,
    },
    {
     id: 6,
     pregunta: "¿Qué es lo que me gustaba hacer de pequeña?",
     opciones: ["Jugar a las Muñecas", "Platicar", "Jugar futbol", "Bañarme"],
     correcta: 1,
    },
    {
     id: 7,
     pregunta: "Si ganase un premio Nobel, ¿cuál sería?",
     opciones: ["El premio a la paciencia", "El premio a la más enojona", "El premio a la más creativa", "El premio a la puntualidad"],
     correcta: 1,
    },
    {
     id: 8,
     pregunta: "¿Cuál es mi dulce favorito?",
     opciones: ["Tutsi pop", "Chupa Pop", "Aciduladito con Chile", "Pulparindo"],
     correcta: 2,
    },
    {
     id: 9,
     pregunta: "¿Qué siempre me hace sonreír?",
     opciones: ["Mis amigos", "Jugar Voleiball", "Cantar", "Caminar"],
     correcta: 0,
     },
    {
     id: 10,
     pregunta: "¿Qué comida podría comer todos los días?",
     opciones: ["Picadillo ", "Cueritos", "Pollo a la cordon blue", "Chilaquiles"],
     correcta: 0,
    },
    {
     id: 11,
     pregunta: "¿Qué anime es mi favorito?",
     opciones: ["Haikyū!! ", "Demon Slayer", "One Piece", "One Punch-Man"],
     correcta: 2,
    },
    {
     id: 12,
     pregunta: "¿De qué color son mis ojos?",
     opciones: ["Azul ", "Café claro", "Verde", "Celestes"],
     correcta: 1,
    },
    {
     id: 13,
     pregunta: "¿Cuál es mi Flor favorita?",
     opciones: ["Girasol ", "Lirio amarillo", "Bugambilia", "Tulipanes rojos"],
    correcta: 3,
    },
    {
     id: 14,
     pregunta: "¿Cuál era mi caricatura favorita de niña?",
     opciones: ["Los Backyardigans ", "Top cat", "Animaniacs", "Los Supersónicos"],
     correcta: 1,
    },
  ];
  
  const mezclarPreguntas = (preguntas: Pregunta[]): Pregunta[] => {
    return [...preguntas].sort(() => Math.random() - 0.5);
  };
  
  const Trivia: React.FC = () => {
    const [vistaPrincipal, setVistaPrincipal] = useState(true);
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [puntos, setPuntos] = useState(0);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);
    const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
    const [triviaTerminada, setTriviaTerminada] = useState(false);
  
    useEffect(() => {
      setPreguntas(mezclarPreguntas(preguntasOriginales));
    }, []);
  
    const manejarRespuesta = (indice: number) => {
      setRespuestaSeleccionada(indice);
      setMostrarRespuesta(true);
  
      if (indice === preguntas[preguntaActual].correcta) {
        setPuntos((prev) => prev + 1);
      }
  
      setTimeout(() => {
        siguientePregunta();
      }, 3000);
    };
  
    const siguientePregunta = () => {
      setMostrarRespuesta(false);
      setRespuestaSeleccionada(null);
  
      if (preguntaActual < preguntas.length - 1) {
        setPreguntaActual((prev) => prev + 1);
      } else {
        setTriviaTerminada(true);
      }
    };
  
    return (
      <div className="trivia-container">
        {vistaPrincipal ? (
          <div className="vista-principal animacion-vista">
            <h1>¿Cuánto me conoces?</h1>
            <p>Te invito a jugar conmigo esta trivia. ¡Descubre que tanto me conoces!</p>
            <button className="boton-iniciar" onClick={() => setVistaPrincipal(false)}>
              Comenzar Trivia
            </button>
          </div>
        ) : triviaTerminada ? (
          <div className="resultado-final animacion-final">
            <h2>¡Trivia completada!</h2>
            <p>
              Obtuviste <strong>{puntos}</strong> de {preguntas.length} puntos.
            </p>
            <p>¡Gracias por participar!</p>
            <button className="boton-reiniciar" onClick={() => window.location.reload()}>
              Reiniciar Trivia
            </button>
          </div>
        ) : (
          <>
            <div className="header">
              <span>
                Pregunta: {preguntaActual + 1} / {preguntas.length}
              </span>
              <span>Puntos: {puntos}</span>
            </div>
            <div key={preguntaActual} className="pregunta animacion-pregunta">
              <h2>{preguntas[preguntaActual].pregunta}</h2>
              <div className="opciones">
                {preguntas[preguntaActual].opciones.map((opcion, index) => (
                  <button
                    key={index}
                    className={`opcion ${
                      mostrarRespuesta
                        ? index === preguntas[preguntaActual].correcta
                          ? "correcta"
                          : index === respuestaSeleccionada
                          ? "incorrecta"
                          : ""
                        : ""
                    }`}
                    onClick={() => manejarRespuesta(index)}
                    disabled={mostrarRespuesta}
                  >
                    {opcion}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default Trivia;