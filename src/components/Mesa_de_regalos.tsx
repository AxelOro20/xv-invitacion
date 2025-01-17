import "./Mesa_de_regalos.css";
import Amazon from "../assets/amazon.webp"; 
import Banamex from "../assets/Citibanamex-logo.webp"; 

const Amazon_link = "https://www.amazon.com.mx/hz/wishlist/ls/2MMUONS02620I?ref_=wl_share";
const MesaDeRegalos = () => {
  return (
    <section className="mesa-de-regalos">
      <h2 className="titulo">Mesa de regalos</h2>
      <p className="mensaje">
        Tu compañía es el mayor regalo para nosotros, Pero si necesitas una idea, aquí tienes algunas sugerencias.
      </p>
      <div className="opciones-regalos">
        <div className="Sugerencia">
          <img src={Amazon} alt="Amazon" className="logo" />
          <p>wishlist amazon</p>
          <button
                className="amaboton"
                onClick={() => window.open(Amazon_link, "_blank")}
              >
                <span>Amazon</span>
              </button>
        </div>
        <div className="Sugerencia">
          <img src={Banamex} alt="Banamex" className="logo_banamex" />
          <p>Dinorah Judith Cardenas Veloz</p>
          <p>Clabe 002180900062462565</p>
          <p>tarjeta 5256-7800-9491-1796</p>
        </div>
      </div>
    </section>
  );
};

export default MesaDeRegalos;
