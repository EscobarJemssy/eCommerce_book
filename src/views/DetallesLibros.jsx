import React, { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";

import Footer from "../components/Footer";
import jsonData from "../assets/google_books_1299_clean_1.json";
import { useCarrito } from "../components/ContCarrito";

const BookDetails = () => { // This component is used to display the details of a book
    const { index } = useParams();
    const [book, setBook] = useState(null);

    const navigate = useNavigate();

    const { agregarProducto } = useCarrito();

    useEffect(() => {
        const found = jsonData.find((item) => item.index === Number(index));
        setBook(found);
    }, [index]);

    if (!book) {
        return <div>Libro no encontrado! </div>;
    }

    function handleAgregarAlCarrito() {
        agregarProducto(book);
        alert(`Libro agregado al carrito: ${book.title}`);
        navigate(-1);
    }

    return (
        <>
            <div>
                <h1>{book.title}</h1>
                <p>Autor: {book.author}</p>
                <p>Precio: {book.price}</p>
                <p>Fecha de publicación: {book.published_date}</p>

                <button type="button" onClick={handleAgregarAlCarrito}>
                    Agregar al Carrito
                </button>
                <button type="button" onClick={() => {navigate(-1);}}>Regresar</button>
            </div>

            <Footer />
        </>
    );
};

export default BookDetails;