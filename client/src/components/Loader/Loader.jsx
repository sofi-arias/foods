import React from "react";
import './Loader.css';

const curiosidad = [
    "Las manzanas pertenecen a la familia de las rosas",
    "Las almendras no son nueces",
    "Las zanahorias no siempre fueron color naranja",
    "El sandwich fue inventado durante un juego de cartas",
    "La pizza hawaiana fue inventada en Canadá",
    "El algodón de azúcar fue inventado por un dentista",
    "Un cuarto de todas las avellanas del mundo son usadas para hacer Nutella",
    "Sin moscas no tendríamos chocolate",
    "El mango puede sufrir quemaduras solares",
    "La miel no tiene fecha de vencimiento"
]

export default function Loader() {
    return (
        <div className="loadercontainer">
            <div className="contentloader">
                    <h1 className="cargando">CARGANDO</h1>
                <span className="loader"></span>
                <div className="sabias"><h2>Sabias qué?...</h2>
                    <h3>{curiosidad[Math.floor((Math.random() * curiosidad.length))]}</h3></div>

            </div>
        </div>

    )
}
