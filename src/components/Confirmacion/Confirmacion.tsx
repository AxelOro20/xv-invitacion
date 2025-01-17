//import React from "react";
import { Link } from "react-router-dom";

function Confirmacion() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>¡Gracias por confirmar tu asistencia!</h1>
      <p>Nos vemos en el evento. 🎉</p>
      <Link to="/">Regresar al formulario</Link>
    </div>
  );
}

export default Confirmacion;
