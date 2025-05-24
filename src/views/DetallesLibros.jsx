import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import jsonData from "../assets/google_books_1299_clean_1.json";

const DetallesLibros = () => {
    const { index } = useParams();
    const [libro, setLibro] = useState(null);

    useEffect(() => {
        const encontrado = jsonData.find((ejemplar) => ejemplar.index === Number(index));
        setLibro(encontrado);
    }, [index]);

    if (!libro) {
        return <div>Algo salio mal! Libro no encontrado</div>;
    }

    return (
        <>
            <h1>{libro.title}</h1>
            <p>Autor: {libro.author}</p>
            <p>Precio: {libro.price}</p>
            <p>Fecha de publicación: {libro.published_date}</p>
            {/* los demas datos y falta el boton para agregar al carrito! */}
            <Footer />
        </>
    );
};

export default DetallesLibros;