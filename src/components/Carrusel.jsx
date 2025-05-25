import React, { useState, useEffect } from "react";
import ContCarrusel from "./subComponents/ContCarrusel";
import jsonData from "../assets/google_books_1299_clean_1.json";
import "../css/CarruselStyle.css"; 

// Componente principal que muestra los diferentes carruseles de libros
const Carrusel = () => {
    // Valor mínimo de rating para considerar un libro como "más vendido"
    const media_rating = 4.25;
    // Rango de votantes para libros recomendados
    const median_voters = [1382, 38526];

    // Libros más vendidos: rating alto, máximo 5 libros
    const best_sold = jsonData
        .filter(book => book.rating && book.rating >= media_rating)
        .slice(0, 5);

    // Libros recomendados: dentro del rango de votantes, ordenados por cantidad de votos
    const rec_book = jsonData
        .filter(rec => rec.voters && rec.voters >= median_voters[0] && rec.voters <= median_voters[1])
        .sort((a, b) => b.voters - a.voters);

    // Libros de temporada: selección aleatoria de 5 libros
    const random_book = [...jsonData]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5); 

    return (
        <>
            {/* Banner de bienvenida */}
            <div className="welcome-banner">
                <h2>Bienvenidos al Guardián de Libros!</h2> 
                <p>Descubre los mejores títulos y encuentra tu próxima lectura favorita.</p> 
            </div>

            {/* Carrusel de libros más vendidos */}
            <div className="carrusel">
                <h2 style={{ fontFamily: 'Bahnschrift Light', fontSize: 22 , textAlign: 'center'}}>Libros más vendidos</h2>
                <ContCarrusel category={best_sold} />

                {/* Carrusel de libros recomendados */}
                <h2 style={{ fontFamily: 'Bahnschrift Light', fontSize: 22, textAlign: 'center' }}>Libros recomendados</h2>
                <ContCarrusel category={rec_book} />

                {/* Carrusel de libros de temporada */}
                <h2 style={{ fontFamily: 'Bahnschrift Light', fontSize: 22, textAlign: 'center' }}>Libros de temporada</h2>
                <ContCarrusel category={random_book} />
            </div>
        </>
    );
};

export default Carrusel;