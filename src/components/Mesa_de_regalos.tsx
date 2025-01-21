import "./Mesa_de_regalos.css";
import Amazon from "../assets/amazon.webp"; 
import Azteca from "../assets/Banco-Azteca_logo.webp"; 

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
          <img src={Azteca} alt="Banco Azteca" className="logo_azteca" />
          <p>Arantza Ruiz Cardenas</p>
          <p>Clabe 127180001795927753</p>
          <p>Num. tarjeta 5534670206638722</p>
        </div>
      </div>
    </section>
  );
};

export default MesaDeRegalos;
