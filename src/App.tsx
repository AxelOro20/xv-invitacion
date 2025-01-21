import { useState, useCallback } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BotonMusica from "./components/BotonMusica";
import Inicio from "./components/Inicio";
import Presentacion from "./components/Presentacion";
import Calendario from "./components/Calendario";
import UbicacionEvento from "./components/UbicacionEvento";
import Temporizador from "./components/Temporizador";
import DressCode from "./components/Dresscode";
import Itinerario from "./components/Itinerario";
import MesaDeRegalos from "./components/Mesa_de_regalos";
import Formulario from "./components/Formulario";
import Galeria_amigos from "./components/Galeria_amigos";
import Galeria_arantza from "./components/Galeria_Arantza"
import SubirFotos from "./components/SubirFotos";
import Trivia from "./components/Trivia";
// import SubirFotos from "./components/SubirFot/SubirFotos";
import Agendar from "./components/Agendar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-scroll";
import "./App.css"


function App() {
  const [triggerRefresh, setTriggerRefresh] = useState(0);

  const handleRefresh = useCallback(() => {
    setTriggerRefresh((prev) => prev + 1);
  }, []);

  return (
    <Router>
      <div>
      <ToastContainer
        position="top-right" // Posición del mensaje
        autoClose={3000} // Duración del mensaje (ms)
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Tema del mensaje
      />
        {/* Secciones */}
        <BotonMusica/>
          <Inicio />
          <section id="Presentacion">
            <Presentacion/>
          </section>
          <section id="Presentacion">
            <Calendario/>
          </section>
          <Temporizador/>
          <section id="ubicacion" style={{ padding: "60px 20px" }}>
                <UbicacionEvento />
            </section>
          <section id="DressCode">
            <DressCode/>
            </section>
          <section id="itinerario" style={{ padding: "60px 20px" }}>
            <Itinerario />
          </section>
          <section id="Mesa de Regalos">
            <MesaDeRegalos />
          </section>
          <section id="confirmacion" style={{ padding: "60px 20px" }}>
            <Formulario />
          </section>
          <Galeria_arantza/>
          <Galeria_amigos triggerRefresh={triggerRefresh} />
          <SubirFotos setTriggerRefresh={handleRefresh} />
          <section id="Trivia" style={{ padding: "60px 20px" }}>
            <Trivia/>
          </section>
          <section id="Agendar" >
            <Agendar />
          </section>
      </div>
    </Router>
  );
}

export default App;
