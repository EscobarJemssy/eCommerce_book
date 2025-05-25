import React, { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";

import Footer from "../components/Footer";
import jsonData from "../assets/google_books_1299_clean_1.json"; // Asegúrate de que la ruta sea correcta
import { useCarrito } from "../components/ContCarrito"; // Asegúrate de que la ruta sea correcta
import "../css/DetallesLibros.css"; // Asegúrate de que la ruta sea correcta

const BookDetails = () => {
    const { index } = useParams();
    const [book, setBook] = useState(null);

    const navigate = useNavigate();

    const { agregarProducto } = useCarrito();

    useEffect(() => {
        // Asegúrate de que los datos tienen 'index' y que es numérico para la comparación
        const found = jsonData.find((item) => String(item.index) === index);
        setBook(found);
    }, [index]);

    if (!book) {
        return (
            <div className="book-detail-container empty-state"> {/* Clases para el contenedor y estado vacío */}
                <h1 className="page-title">Libro no encontrado</h1>
                <p>Lo sentimos, el libro que buscas no está disponible o no existe.</p>
                <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
                    Regresar
                </button>
            </div>
        );
    }

    function handleAgregarAlCarrito() {
        agregarProducto(book);
        alert(`Libro agregado al carrito: ${book.title}`);
        navigate(-1); // Regresar después de agregar
    }

    return (
        <div className="book-detail-container"> {/* Contenedor principal de la página de detalles */}
            <h1 className="page-title">{book.title}</h1> {/* Título principal de la página */}

            <div className="book-content-wrapper"> {/* Contenedor para imagen y detalles */}
                <div className="book-image-area">
                    {/* Usar una imagen de placeholder si no hay una URL de imagen en el JSON, o si es la misma para todos como en tu ejemplo */}
                    <img
                        src={book.images} // Usar book.image_url si existe
                        alt={`Portada de ${book.title}`}
                        className="book-cover" // Clase para la imagen
                    />
                </div>
                <div className="book-info-area card"> {/* Clase 'card' para que tenga un aspecto de tarjeta */}
                    <p><strong>Autor:</strong> {book.author}</p>
                    <p><strong>Editorial:</strong> {book.publisher}</p>
                    <p><strong>Fecha de publicación:</strong> {book.published_date}</p>
                    <p><strong>Páginas:</strong> {book.page_count}</p>
                    <p><strong>Idioma:</strong> {book.language}</p>
                    <p><strong>ISBN:</strong> {book.ISBN}</p>
                    {/* Descripción a menudo es un párrafo más largo */}
                    <div className="book-description">
                         <h3>Descripción</h3>
                         <p>{book.description}</p>
                    </div>
                    <p className="book-price"><strong>Precio:</strong> <span className="price-value">{book.price}</span></p> {/* Clase para el precio */}
                </div>
            </div>

            <div className="book-actions"> {/* Contenedor para los botones */}
                <button type="button" onClick={handleAgregarAlCarrito} className="btn btn-primary">
                    Agregar al Carrito
                </button>
                <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
                    Regresar
                </button>
            </div>

            <Footer />
        </div>
    );
};

export default BookDetails;