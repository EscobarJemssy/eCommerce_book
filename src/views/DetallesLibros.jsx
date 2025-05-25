import React, { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";

import Footer from "../components/Footer";
import jsonData from "../assets/google_books_1299_clean_1.json"; 
import { useCarrito } from "../components/ContCarrito"; 
import "../css/DetallesLibros.css"; 

const BookDetails = () => {
    const { index } = useParams();
    const [book, setBook] = useState(null);

    const navigate = useNavigate();

    // Accede a la función para agregar productos al carrito
    const { agregarProducto } = useCarrito();

    // Busca el libro por índice cuando cambia el parámetro de la URL
    useEffect(() => {
        const found = jsonData.find((item) => String(item.index) === index);
        setBook(found);
    }, [index]);

    // Si no se encuentra el libro, muestra mensaje y botón para regresar
    if (!book) {
        return (
            <div className="book-detail-container empty-state"> 
                <h1 className="page-title">Libro no encontrado</h1>
                <p>Lo sentimos, el libro que buscas no está disponible o no existe.</p>
                <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
                    Regresar
                </button>
            </div>
        );
    }

    // Maneja el evento de agregar el libro al carrito y regresa a la página anterior
    function handleAgregarAlCarrito() {
        agregarProducto(book);
        alert(`Libro agregado al carrito: ${book.title}`);
        navigate(-1); // redirecciona a la página anterior
    }

    return (
        <div className="book-detail-container"> 
            <h1 className="page-title">{book.title}</h1> 

            <div className="book-content-wrapper"> 
                {/* Muestra la portada del libro */}
                <div className="book-image-area">
                    <img
                        src={book.images} 
                        alt={`Portada de ${book.title}`}
                        className="book-cover" 
                    />
                </div>
                {/* Muestra la información detallada del libro */}
                <div className="book-info-area card">
                    <p><strong>Autor:</strong> {book.author}</p>
                    <p><strong>Editorial:</strong> {book.publisher}</p>
                    <p><strong>Fecha de publicación:</strong> {book.published_date}</p>
                    <p><strong>Páginas:</strong> {book.page_count}</p>
                    <p><strong>Idioma:</strong> {book.language}</p>
                    <p><strong>ISBN:</strong> {book.ISBN}</p>
                    <div className="book-description">
                         <h3>Descripción</h3>
                         <p>{book.description}</p>
                    </div>
                    <p className="book-price"><strong>Precio:</strong> <span className="price-value">{book.price}</span></p> 
                </div>
            </div>

            {/* Botones para agregar al carrito o regresar */}
            <div className="book-actions"> 
                <button type="button" onClick={handleAgregarAlCarrito} className="btn btn-primary">
                    Agregar al Carrito
                </button>
                <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
                    Regresar
                </button>
            </div>

            {/* Pie de página */}
            <Footer />
        </div>
    );
};

export default BookDetails;