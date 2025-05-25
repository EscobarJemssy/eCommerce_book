import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import jsonData from "../assets/google_books_1299_clean_1.json"; // Asegúrate de que la ruta sea correcta
import "../css/Libros.css"; // Asegúrate de que la ruta sea correcta

const Libros = () => {
    const navegacion = useNavigate();

    const [Visibilidad, setVisibilidad] = useState([]);
    const [pagina, setPagina] = useState(0);
    const loaderRef = useRef(null);
    const LIMITE = 15;

    const [autorSeleccionado, setAutorSeleccionado] = useState("Todos");
    const autoresUnicos = ["Todos", ...new Set(jsonData.map(libro => libro.author))];

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
    const categoriasUnicas = [
        "Todas", ...Array.from(new Set(jsonData.flatMap(libro => libro.generes && libro.generes !== "Undefined" ? libro.generes.split(",").map(g => g.trim()) : [])))
    ];

    // Cargar la primera página de datos al inicio y manejar la paginación del scroll
    useEffect(() => {
        const cargarPagina = () => {
            const inicio = pagina * LIMITE;
            const bucle = [];

            // Asegura que no se superponga el tamaño del jsonData si se está ciclando
            for (let i = 0; i < LIMITE; i++) {
                const dataIndex = (inicio + i) % jsonData.length;
                bucle.push(jsonData[dataIndex]);
            }

            // Simulación de carga (mantener para la funcionalidad de scroll)
            setTimeout(() => {
                if (pagina === 0) {
                    setVisibilidad(bucle);
                } else {
                    setVisibilidad(prev => [...prev, ...bucle]);
                }
            }, 500); // Reducido el tiempo a 0.5s para una mejor UX
        };

        cargarPagina();

    }, [pagina]); // Dependencia solo de 'pagina'

    // observer para el scroll infinito (NO SE MODIFICA LA LÓGICA)
    useEffect(() => {
        const observer = new IntersectionObserver(entradas => {
            if (entradas[0].isIntersecting) {
                // Solo cargar la siguiente página si los filtros no están aplicados
                // Si quieres que el scroll infinito funcione con filtros, necesitarías otra lógica
                // Por ahora, asumimos que se carga "sin filtrar" y el filtrado es posterior
                if (autorSeleccionado === "Todos" && categoriaSeleccionada === "Todas") {
                     setPagina(prev => prev + 1);
                }
            }
        }, {
            threshold: 0.1 // Opciones del observer
        });

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [autorSeleccionado, categoriaSeleccionada]); // Agregamos dependencias para re-observar si cambian los filtros

    // Función para limpiar los filtros
    function limpiarFiltros() {
        setAutorSeleccionado("Todos");
        setCategoriaSeleccionada("Todas");
        // Cuando se limpian los filtros, reiniciamos la paginación
        setPagina(0);
        setVisibilidad([]); // Limpiar la lista para que se recargue desde el inicio
    }

    // Filtrar los libros visibles por autor y categoría
    const librosFiltrados = Visibilidad.filter(libro =>
        (autorSeleccionado === "Todos" || libro.author === autorSeleccionado) &&
        (categoriaSeleccionada === "Todas" || (libro.generes && libro.generes.includes(categoriaSeleccionada)))
    );


    return (
        <div className="libros-page-container"> {/* Contenedor principal de la página */}
            <h1 className="page-title">Explora Nuestros Libros</h1>

            {/* Filtros para autor y categoría */}
            <div className="filtros-container card"> {/* Contenedor de filtros con estilo de tarjeta */}
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

                <button onClick={limpiarFiltros} className="btn btn-secondary">Limpiar filtros</button>
            </div>

            {/* Lista de libros filtrados */}
            {librosFiltrados.length === 0 ? (
                <div className="empty-results-message card">
                    <p>No se encontraron libros con los filtros seleccionados.</p>
                </div>
            ) : (
                <ul className="libros-grid"> {/* Usamos un grid para mostrar los libros */}
                    {librosFiltrados.map((libro, idx) => (
                        <li key={idx} className="libro-item" onClick={() => navegacion(`/DetalleLibro/${libro.index}`)}>
                            <img
                                src={libro.images} // Usa la imagen del libro o placeholder
                                alt={libro.title}
                                className="libro-cover"
                            />
                            <div className="libro-info">
                                <h3 className="libro-title">{libro.title}</h3>
                                <p className="libro-author"><strong>Autor:</strong> {libro.author}</p>
                                <p className="libro-price"><strong>Precio:</strong> <span className="price-value">{libro.price}</span></p>
                            </div>
                            {/* El botón "Ver Mas!" se puede quitar, ya que el click en el LI entero lleva a los detalles */}
                            {/* <button type="button" className="btn btn-primary btn-sm">Ver Más</button> */}
                        </li>
                    ))}
                </ul>
            )}

            {/* Loader para el scroll infinito (NO SE MODIFICA EL ATRIBUTO ref) */}
            <div ref={loaderRef} className="loader-message">
                {/* Solo muestra el mensaje si hay libros y los filtros están en "Todos" */}
                {librosFiltrados.length > 0 && autorSeleccionado === "Todos" && categoriaSeleccionada === "Todas" && (
                    <p>Cargando más libros...</p>
                )}
                {/* Puedes añadir un spinner si quieres */}
            </div>
        </div>
    );
};

export default Libros;