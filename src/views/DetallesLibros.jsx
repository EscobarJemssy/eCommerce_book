import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import jsonData from "../assets/google_books_1299_clean_1.json";

const BookDetails = () => {
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
            
            {/* other data and missing add to cart button! */}
            <Footer />
        </>
    );
};

export default BookDetails;