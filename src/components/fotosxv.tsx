import quinceaneraImage from '../assets/Ara.jpg'; 

const FotosXV = () => {
  return (
    <div className="fotosxv-container">
      {/* Sección de la foto de la quinceañera */}
      <div className="quinceanera-container">
        <img src={quinceaneraImage} alt="Quinceañera" className="quinceanera-image" />
      </div>

      {/* Aquí podrías agregar más secciones o fotos si lo necesitas */}
      <div className="other-photos">
        {/* Aquí podrías agregar más imágenes o contenido */}
      </div>
    </div>
  );
};

export default FotosXV;
