import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import jsonData from "../assets/google_books_1299_clean_1.json";

const BookDetails = () => { // This component is used to display the details of a book
    const { index } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const found = jsonData.find((item) => item.index === Number(index));
        setBook(found);
    }, [index]);

    if (!book) {
        return <div>Libro no encontrado! </div>;
    }

    return (
        <>
            <h1>{book.title}</h1>
            <p>Autor: {book.author}</p>
            <p>Precio: {book.price}</p>
            <p>Fecha de publicación: {book.published_date}</p>
            <p>Descripción: {book.description}</p>
            <p>Lugar de publicación: {book.publisher}</p>
            <p>ISBN: {book.ISBN}</p>
            <p>Idioma: {book.language}</p>
            <p>Paginas: {book.page_count}</p>
            <p>Fecha de publicación: {book.published_date}</p>
            <Footer />
        </>
    );
};

export default BookDetails;