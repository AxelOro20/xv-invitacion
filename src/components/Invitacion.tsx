import Personalizacion from "./Personalizacion";

function Invitacion() {
  return (
    <div className="invitacion-container">
      <Personalizacion />
      <p className="mensaje-bienvenida">
        Estás invitado a la celebración de los XV años de [Nombre de la Festejada].
      </p>
    </div>
  );
}

export default Invitacion;
