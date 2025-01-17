import { useState, useEffect } from "react";
import "./Personalizacion.css"; // Puedes agregar estilos específicos aquí

function Personalizacion() {
  const [nombreInvitado, setNombreInvitado] = useState<string>("");

  useEffect(() => {
    // Obtén el nombre del invitado desde los parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get("nombre");
    setNombreInvitado(nombre ? decodeURIComponent(nombre) : "Invitado Especial");
  }, []);

  return (
    <div className="personalizacion-container">
      <h1 className="titulo-personalizado">
        {`¡Hola, ${nombreInvitado}!`}
      </h1>
    </div>
  );
}

export default Personalizacion;
