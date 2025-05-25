import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import jsonData from "../assets/google_books_1299_clean_1.json"; 
import "../css/Libros.css"; 

const Libros = () => {
    const navegacion = useNavigate();

    // Estado para los libros visibles en pantalla
    const [Visibilidad, setVisibilidad] = useState([]);
    // Estado para la página actual (paginación/infinite scroll)
    const [pagina, setPagina] = useState(0);
    // Referencia al loader para detectar el scroll al final
    const loaderRef = useRef(null);
    // Cantidad de libros por página
    const LIMITE = 15;

    // Estado y opciones para filtro por autor
    const [autorSeleccionado, setAutorSeleccionado] = useState("Todos");
    const autoresUnicos = ["Todos", ...new Set(jsonData.map(libro => libro.author))];

    // Estado y opciones para filtro por categoría
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
    const categoriasUnicas = [
        "Todas", ...Array.from(new Set(jsonData.flatMap(libro => libro.generes && libro.generes !== "Undefined" ? libro.generes.split(",").map(g => g.trim()) : [])))
    ];

    // Carga libros según la página (efecto de paginación/infinite scroll)
    useEffect(() => {
        const cargarPagina = () => {
            const inicio = pagina * LIMITE;
            const bucle = [];

            for (let i = 0; i < LIMITE; i++) {
                const dataIndex = (inicio + i) % jsonData.length;
                bucle.push(jsonData[dataIndex]);
            }

            setTimeout(() => {
                if (pagina === 0) {
                    setVisibilidad(bucle);
                } else {
                    setVisibilidad(prev => [...prev, ...bucle]);
                }
            }, 500); // Simula tiempo de carga
        };

        cargarPagina();

    }, [pagina]); 

    // Observa el loader para cargar más libros al hacer scroll (solo si no hay filtros)
    useEffect(() => {
        const observer = new IntersectionObserver(entradas => {
            if (entradas[0].isIntersecting) {
                if (autorSeleccionado === "Todos" && categoriaSeleccionada === "Todas") {
                     setPagina(prev => prev + 1);
                }
            }
        }, {
            threshold: 0.1 
        });

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [autorSeleccionado, categoriaSeleccionada]); 

    // Limpia los filtros y reinicia la paginación
    function limpiarFiltros() {
        setAutorSeleccionado("Todos");
        setCategoriaSeleccionada("Todas");
        setPagina(0);
        setVisibilidad([]);
    }

    // Aplica los filtros seleccionados a los libros visibles
    const librosFiltrados = Visibilidad.filter(libro =>
        (autorSeleccionado === "Todos" || libro.author === autorSeleccionado) &&
        (categoriaSeleccionada === "Todas" || (libro.generes && libro.generes.includes(categoriaSeleccionada)))
    );

    return (
        <div className="libros-page-container"> 
            <h1 className="page-title">Explora Nuestros Libros</h1>

            {/* Filtros de autor y categoría */}
            <div className="filtros-container card">
                <div className="filter-group">
                    <label className="filter-label"><strong>Filtrar por autor:</strong></label>
                    <select value={autorSeleccionado} onChange={(e) => setAutorSeleccionado(e.target.value)} className="select-input">
                        {autoresUnicos.map((autor, i) => (
                            <option key={i} value={autor}>{autor}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label"><strong>Filtrar por categoría:</strong></label>
                    <select value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)} className="select-input">
                        {categoriasUnicas.map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Botón para limpiar filtros */}
                <button onClick={limpiarFiltros} className="btn btn-secondary">Limpiar filtros</button>
            </div>

            {/* Muestra mensaje si no hay resultados */}
            {librosFiltrados.length === 0 ? (
                <div className="empty-results-message card">
                    <p>No se encontraron libros con los filtros seleccionados.</p>
                </div>
            ) : (
                // Muestra los libros filtrados en una cuadrícula
                <ul className="libros-grid"> 
                    {librosFiltrados.map((libro, idx) => (
                        <li key={idx} className="libro-item" onClick={() => navegacion(`/DetalleLibro/${libro.index}`)}>
                            <img
                                src={libro.images} 
                                alt={libro.title}
                                className="libro-cover"
                            />
                            <div className="libro-info">
                                <h3 className="libro-title">{libro.title}</h3>
                                <p className="libro-author"><strong>Autor:</strong> {libro.author}</p>
                                <p className="libro-price"><strong>Precio:</strong> <span className="price-value">{libro.price}</span></p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Loader para infinite scroll */}
            <div ref={loaderRef} className="loader-message">
                {librosFiltrados.length > 0 && autorSeleccionado === "Todos" && categoriaSeleccionada === "Todas" && (
                    <p>Cargando más libros...</p>
                )}
            </div>
        </div>
    );
};

export default Libros;