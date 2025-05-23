import React, { useEffect, useState, useRef } from "react";
import jsonData from "../assets/google_books_1299_copy.json"

const Libros = () => {

    const [Visibilidad, setVisibilidad] = useState([]);
    const [Pagina, setPagina] = useState(0);
    const Carga = useRef(null);
    const Limite = 15;

    useEffect(() => {
        const CargaPagina = () => {
            const Inicio = Pagina * Limite;
            const Bucle = [];

            for (let i = 0; 1 < Limite; i++) {
                const Index = (Inicio + 1) % jsonData.length;
                Bucle.push(jsonData[Index]);
            }

            setVisibilidad(prev => [...prev, ...Bucle]);

        };

        CargaPagina();

    }, [Pagina]);

    useEffect (() =>{
        const observer = new IntersectionObserver(entradas => {
            if(entradas[0].isIntersecting){
                setPagina(prev => prev+1)
            }
        });

        if (Carga.current) observer.observe(Carga.current);

        return () => {
            if (Carga.current) observer.observe(Carga.current);
        };
    }, []); 

    return (
        <>
            <h1>Soy los libros</h1>
        </>
    )

};

export default Libros;