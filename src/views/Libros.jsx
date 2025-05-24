import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import jsonData from "../assets/google_books_1299_clean_1.json"

const Libros = () => {

    // importacion para la navegacion de paginas
    const navegacion = useNavigate();

    // variables para la muestra de items y scroll infinito
    const [Visibilidad, setVisibilidad] = useState([]);
    const [pagina, setPagina] = useState(0);
    const loaderRef = useRef(null);
    const LIMITE = 15;

    // variables para filtrar
    // autores
    const [autorSeleccionado, setAutorSeleccionado] = useState("Todos");
    const autoresUnicos = ["Todos", ...new Set(jsonData.map(libro => libro.author))];
    // generos
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
    const categoriasUnicas = [
        "Todas", ...Array.from(new Set(jsonData.flatMap(libro => libro.generes && libro.generes !== "Undefined" ? libro.generes.split(",").map(g => g.trim()) : [])))
    ];

    // Cargar la primera página de datos al inicio
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

    // observer para el scroll infinito
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

    // funcion para limpiar los filtros
    function limpiarFiltros() {
        setAutorSeleccionado("Todos");
        setCategoriaSeleccionada("Todas");
    }


    return (
        <div style={{ height: '80vh', overflowY: 'auto' }}>

            {/* filtros para autor y categoría */}
            <div style={{ padding: '10px', display: 'flex', gap: '20px' }}>
                <div>
                    <label><strong>Filtrar por autor:</strong></label>
                    <select value={autorSeleccionado} onChange={(e) => setAutorSeleccionado(e.target.value)}>
                        {autoresUnicos.map((autor, i) => (
                            <option key={i} value={autor}>{autor}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label><strong>Filtrar por categoría:</strong></label>
                    <select value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
                        {categoriasUnicas.map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <button onClick={limpiarFiltros}>Limpiar filtros</button>
            </div>


            {/* lista de libros filtrados */}
            <ul>
<<<<<<< HEAD
                {Visibilidad
                    .filter(libro =>
                        (autorSeleccionado === "Todos" || libro.author === autorSeleccionado) &&
                        (categoriaSeleccionada === "Todas" || (libro.generes && libro.generes.includes(categoriaSeleccionada)))
                    )
                    .map((libro, index) => (

                        <li key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', gap: '15px' }}>
                            <img
                                src="https://cdn.shopify.com/s/files/1/2482/2494/files/Cuentos_de_los_hermanos_Grimm_480x480.jpg?v=1629400827"
                                alt={libro.title}
                                style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                            />
                            <div>
                                <strong>Nombre:</strong> {libro.title}<br />
                                <strong>Tipo:</strong> {libro.author}<br />
                                <strong>Precio:</strong> {libro.price}<br />
                                <strong>Fecha:</strong> {libro.published_date}
                            </div>
=======
                {Visibilidad.map((libro, index) => (
                    <li key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', gap: '15px' }}>
                        <img
                            src="https://cdn.shopify.com/s/files/1/2482/2494/files/Cuentos_de_los_hermanos_Grimm_480x480.jpg?v=1629400827"
                            alt={libro.title}
                            style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                        />
                        <div>
                            <strong>Nombre:</strong> {libro.title}<br />
                            <strong>Autor:</strong> {libro.author}<br />
                            <strong>Precio:</strong> {libro.price}<br />
                            <strong>Fecha de publicación:</strong> {libro.published_date}<br />
                            <strong>Descripción:</strong> {libro.description}<br />
                            <strong>Editorial:</strong> {libro.publisher}<br />
                            <strong>ISBN:</strong> {libro.ISBN}<br />
                            <strong>Idioma:</strong> {libro.language}<br />
                            <strong>Páginas:</strong> {libro.page_count}<br />
                        </div>

                        <button type="button" onClick={() => Redireccion(libro.index)}>Ver Mas!</button>
                        <button type="button">Llevar al Carrito</button>
>>>>>>> 1f5b6f2cdde3f2a3fb148d87cec0976a3e697079

                            <button type="button" onClick={() => {navegacion(`/DetalleLibro/${index}`);}}>Ver Mas!</button>

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