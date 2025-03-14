import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import BotonMusica from "./components/BotonMusica";
import Inicio from "./components/Inicio";
import Fotosxv from "./components/fotosxv";
import Presentacion from "./components/Presentacion";
import Calendario from "./components/Calendario";
import UbicacionEvento from "./components/UbicacionEvento";
import Temporizador from "./components/Temporizador";
import DressCode from "./components/Dresscode";
import Itinerario from "./components/Itinerario";
import MesaDeRegalos from "./components/Mesa_de_regalos";
import Formulario from "./components/Formulario";
import Galeria_arantza from "./components/Galeria_Arantza";
import FotosFiesta from "./Fotos_fiesta";
import Trivia from "./components/Trivia";
import Agendar from "./components/Agendar";
import ListaConfirmaciones from "./components/ListaConfirmaciones";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {

  return (
    <Router>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        {/* Rutas de la aplicación */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <BotonMusica />
                <Inicio />
                <section>
                  <Fotosxv />
                </section>
                <section id="Presentacion">
                  <Presentacion />
                </section>
                <section id="Presentacion">
                  <Calendario />
                </section>
                <Temporizador />
                <section id="ubicacion" style={{ padding: "60px 20px" }}>
                  <UbicacionEvento />
                </section>
                <section id="DressCode">
                  <DressCode />
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
                <Galeria_arantza />
                <section id="Trivia" style={{ padding: "60px 20px" }}>
                  <Trivia />
                </section>
                <section id="Agendar">
                  <Agendar />
                </section>
              </>
            }
          />
          <Route path="/fotos_fiesta" element={<FotosFiesta />} />
          <Route path="/lista_confirmaciones" element={<ListaConfirmaciones />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
