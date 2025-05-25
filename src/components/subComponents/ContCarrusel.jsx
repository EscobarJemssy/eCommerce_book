import React, { useState, useRef, useEffect } from 'react';

// Componente principal del carrusel, recibe la lista de libros por categoría
const ContCarrusel = ({category}) => { 

    // Estado para el índice actual del carrusel
    const [currentIndex, setCurrentIndex] = useState(0);
    // Referencia al contenedor del carrusel para manipular el scroll
    const carruselRef = useRef(null);
    // Número de elementos visibles a la vez
    const Limite = 5; 

    // Función para mover el carrusel a la derecha manualmente
    const Derecha = () => {
        if (carruselRef.current) {
            const itemWidth = 200 + 20; // Ancho del item + margen
            carruselRef.current.scrollBy({
                left: itemWidth * Limite, 
                behavior: 'smooth'
            });
        }
    };

    // Función para mover el carrusel a la izquierda manualmente
    const Izquierda = () => {
        if (carruselRef.current) {
            const itemWidth = 200 + 20; 
            carruselRef.current.scrollBy({
                left: -itemWidth * Limite, 
                behavior: 'smooth'
            });
        }
    };

    // Efecto para manejar eventos de scroll y detectar límites del carrusel
    useEffect(() => {
        const carousel = carruselRef.current;
        if (!carousel) return;

        const handleScroll = () => {
            const scrollWidth = carousel.scrollWidth;
            const clientWidth = carousel.clientWidth;
            const scrollLeftPos = carousel.scrollLeft;
            const threshold = 50; // Margen para detectar el final/inicio

            // Aquí se pueden agregar acciones al llegar al final/inicio del carrusel
            if (scrollLeftPos + clientWidth >= scrollWidth - threshold && category.length > Limite) {
                // Al final del carrusel
            } else if (scrollLeftPos <= threshold && scrollLeftPos !== 0 && category.length > Limite) {
                // Al inicio del carrusel
            }
        };

        carousel.addEventListener('scroll', handleScroll);
        return () => carousel.removeEventListener('scroll', handleScroll);
    }, [category.length, Limite]);

    // Devuelve los elementos visibles (aquí retorna todos, pero se puede limitar)
    const getVisibleItems = () => {
        return category; 
    };

    // Avanza el carrusel a la siguiente página de elementos
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + Limite) % category.length);
        if (carruselRef.current) {
            const itemWidth = 200 + 20;
            const newScrollPos = (currentIndex + Limite) * itemWidth;
            carruselRef.current.scrollTo({
                left: newScrollPos,
                behavior: 'smooth'
            });
            // Si llega al final, vuelve al inicio
            if (currentIndex + Limite >= category.length) {
                setTimeout(() => {
                    carruselRef.current.scrollTo({ left: 0, behavior: 'instant' });
                    setCurrentIndex(0); 
                }, 300);
            }
        }
    };

    // Retrocede el carrusel a la página anterior de elementos
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - Limite;
            return newIndex < 0 ? Math.max(0, category.length - Limite) : newIndex;
        });

        if (carruselRef.current) {
            const itemWidth = 200 + 20;
            const newScrollPos = (currentIndex - Limite) * itemWidth;
            carruselRef.current.scrollTo({
                left: newScrollPos,
                behavior: 'smooth'
            });

            // Si llega al inicio, salta al final
            if (currentIndex - Limite < 0) {
                 setTimeout(() => {
                    const lastScrollPos = (category.length - Limite) * itemWidth;
                    carruselRef.current.scrollTo({ left: lastScrollPos, behavior: 'instant' });
                    setCurrentIndex(Math.max(0, category.length - Limite)); 
                }, 300); 
            }
        }
    };

    // Duplica los elementos para lograr efecto de carrusel infinito
    const itemsToRender = [...category, ...category, ...category];

    return (
        <div className="carrusel-wrapper"> 
            {/* Flecha para retroceder */}
            <button className="carrusel-arrow left-arrow" onClick={handlePrev}>&#9664;</button> 
            <div className="carrusel-horizontal-wrapper" ref={carruselRef}>
                <div className="carrusel-horizontal">
                    {/* Renderiza los libros del carrusel */}
                    {itemsToRender.map((cat, index) => (
                        <div key={`${cat.index}-${index}`} className="cat"> 
                            <img src={cat.images} alt={cat.title} />
                            <h3>{cat.title}</h3>
                            <p>{cat.author}</p>
                            <p>{cat.price}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Flecha para avanzar */}
            <button className="carrusel-arrow right-arrow" onClick={handleNext}>&#9654;</button>
        </div>
    );
}

export default ContCarrusel;
