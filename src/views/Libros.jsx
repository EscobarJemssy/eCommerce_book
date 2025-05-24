import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import jsonData from "../assets/google_books_1299_copy.json"

const Libros = () => {

    const navegacion = useNavigate();

    const [Visibilidad, setVisibilidad] = useState([]);
    const [pagina, setPagina] = useState(0);
    const loaderRef = useRef(null);
    const LIMITE = 15;

    useEffect(() => {
        const cargarPagina = () => {
            const inicio = pagina * LIMITE;
            const bucle = [];

            for (let i = 0; i < LIMITE; i++) {
                const index = (inicio + i) % jsonData.length;
                bucle.push(jsonData[index]);
            }

            setTimeout(() => {
                if (pagina === 0) {
                    setVisibilidad(bucle);
                } else {
                    setVisibilidad(prev => [...prev, ...bucle]);
                }
            }, 1000);
        };

        cargarPagina();

    }, [pagina]);

    useEffect(() => {
        const observer = new IntersectionObserver(entradas => {
            if (entradas[0].isIntersecting) {
                setPagina(prev => prev + 1);
            }
        });

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, []);

    function Redireccion(index) {
        navegacion(`/DetalleLibro/${index}`); 
    }


    return (
        <div style={{ height: '80vh', overflowY: 'auto' }}>
            <ul>
                {Visibilidad.map((libro, index) => (
                    <li key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', gap: '15px' }}>
                        <img
                            src="https://cdn.shopify.com/s/files/1/2482/2494/files/Cuentos_de_los_hermanos_Grimm_480x480.jpg?v=1629400827"
                            alt={libro.title}
                            style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                        />
                        <div>
                            <strong>Nombre:</strong> {libro.title}<br />
                            <strong>Tipo:</strong> {libro.author}<br />
                            <strong>Tamaño:</strong> {libro.price}<br />
                            <strong>Fecha:</strong> {libro.published_date}
                        </div>

                        <button type="button" onClick={() => Redireccion(libro.index)}>Ver Mas!</button>

                    </li>
                ))}
            </ul>
            <div ref={loaderRef} style={{ padding: '20px', textAlign: 'center' }}>
                Cargando más archivos...
            </div>
        </div>
    );

};

export default Libros;