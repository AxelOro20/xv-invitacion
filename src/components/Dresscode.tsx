import { useEffect, useRef } from "react";
import DressCodeImage from "../assets/DreesCodee.webp";
import "./Dresscode.css";
import Advertencia from "../assets/advertencia.webp";

const DressCode = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.1 }
        );

        const currentElement = containerRef.current; // Guardar el valor de ref actual

        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, []);

    return (
        <div className="dress-code-container">
            <h1 className="dress-code-title">Dress Code: Elegancia</h1>
            <div className="Regla-container">
                <img src={Advertencia} alt="Advertencia" className="icono-advertencia" />
                <h2 className="Regla">
                    ¡El color <span className="resaltado-rojo">Rojo</span> está reservado para la quinceañera!
                </h2>
                <img src={Advertencia} alt="Advertencia" className="icono-advertencia" />
            </div>

            <div ref={containerRef} className="dress-code-content animate-on-scroll">
                <div className="image-container">
                    <img
                        src={DressCodeImage}
                        alt="Dress Code Inspiration"
                        className="dress-code-image"
                    />
                </div>
            </div>
        </div>
    );
};

export default DressCode;
