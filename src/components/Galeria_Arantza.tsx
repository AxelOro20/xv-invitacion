import React, { useRef } from "react";
import "./Galeria_Arantza.css";
import babyArantza from "../assets/Baby_arantza.jpg";
import babyArantza2 from "../assets/Baby_arantza4.jpg";
import babyArantza3 from "../assets/Baby_arantza2.jpg";
import babyArantza4 from "../assets/Baby_arantza3.jpg";
import babyArantza5 from "../assets/Baby_arantza5.jpg";
import babyArantza6 from "../assets/Baby_arantza6.jpg";
import babyArantza7 from "../assets/Baby_arantza7.jpg";
import babyArantza8 from "../assets/babyArantza8.jpg";
import babyArantza9 from "../assets/babyArantza9.jpg"
import babyArantza10 from "../assets/babyArantza10.jpg";
import babyArantza11 from "../assets/babyArantza11.jpg";

const Carousel: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const images = [
    { src: babyArantza, description: "3 años" },
    { src: babyArantza2, description: "4 años" },
    { src: babyArantza4, description: "5 años" },
    { src: babyArantza3, description: "6 años" },
    { src: babyArantza5, description: "7 años" },
    { src: babyArantza6, description: "8 años" },
    { src: babyArantza9, description: "9 años" },
    { src: babyArantza7, description: "9 años" },
    { src: babyArantza8, description: "10 años" },
    { src: babyArantza11, description: "11 años" },
    { src: babyArantza10, description: "12 años" },
  ];

  const handlePrev = () => {
    const track = trackRef.current;
    if (track) {
      const carruselWidth = track.children[0].clientWidth;
      const currentLeft = Math.abs(parseFloat(track.style.left || "0")) || 0;
      if (currentLeft > 0) {
        track.style.left = `-${currentLeft - carruselWidth}px`;
      }
    }
  };

  const handleNext = () => {
    const track = trackRef.current;
    if (track) {
      const carruselWidth = track.children[0].clientWidth;
      const listWidth = track.parentElement?.clientWidth || 0;
      const maxScroll = track.scrollWidth - listWidth;
      const currentLeft = Math.abs(parseFloat(track.style.left || "0")) || 0;

      if (currentLeft < maxScroll) {
        track.style.left = `-${currentLeft + carruselWidth}px`;
      }
    }
  };

  return (
    <div className="carousel">
      <div className="carrusel-list">
        <button className="carrusel-arrow carrusel-prev" onClick={handlePrev}>
          <svg
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
            />
          </svg>
        </button>
        <div className="carrusel-track" id="track" ref={trackRef}>
          {images.map((image, index) => (
            <div className="carrusel" key={index}>
              <h4>{image.description}</h4>
              <img src={image.src} alt={`Imagen ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className="carrusel-arrow carrusel-next" onClick={handleNext}>
          <svg
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
