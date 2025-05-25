import React, { useState, useEffect } from "react";
import ContCarrusel from "./subComponents/ContCarrusel";
import jsonData from "../assets/google_books_1299_clean_1.json";
import "../css/CarruselStyle.css"; 

const Carrusel = () => {
    const media_rating = 4.25 //4.24888888888889
    const median_voters = [1382, 38526] //135.0
    const best_sold = jsonData.filter(book => book.rating && book.rating >= media_rating).slice(0, 5);
    const rec_book = jsonData.filter(rec => rec.voters && rec.voters >= median_voters[0] && rec.voters <= median_voters[1]).sort((a, b) => b.voters - a.voters)
    const random_book = [...jsonData].sort(() => Math.random() - 0.5).slice(0, 5); 
    return (
        <>

            <div className="welcome-banner">
                <h2>Bienvenidos al Guardián de Libros!</h2> 
                <p>Descubre los mejores títulos y encuentra tu próxima lectura favorita.</p> 
            </div>

            <div class="carrusel">
                <h2 class="titulo">Libros más vendidos</h2>
                <ContCarrusel category={best_sold} />
                <h2 class="titulo">Libros recomendados</h2>
                <ContCarrusel category={rec_book} />
                <h2 class="titulo">Libros de temporada</h2>
                <ContCarrusel category={random_book} />
            </div>

        </>
    );

};

export default Carrusel;