import { useState } from "react";
import Galeria from "./components/Galeria_amigos";
import SubirFotos from "./components/SubirFotos";

const FotosFiesta = () => {
  const [triggerRefresh, setTriggerRefresh] = useState(0);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Fotos de la Fiesta</h1>
      <SubirFotos setTriggerRefresh={setTriggerRefresh} />
      <Galeria triggerRefresh={triggerRefresh} />
    </div>
  );
};

export default FotosFiesta;
