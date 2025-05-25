import React, { useState, useRef, useEffect } from 'react';

const ContCarrusel = ({category}) => { // category is the prop passed from Carrusel

    const [currentIndex, setCurrentIndex] = useState(0);
    const carruselRef = useRef(null);
    const Limite = 5; 

    const Derecha = () => {
        if (carruselRef.current) {
            const itemWidth = 200 + 20; // Ancho del item (200px) + gap (20px)
            carruselRef.current.scrollBy({
                left: itemWidth * Limite, // Desplaza por la cantidad de elementos visibles
                behavior: 'smooth'
            });
        }
    };

    const Izquierda = () => {
        if (carruselRef.current) {
            const itemWidth = 200 + 20; // Ancho del item (200px) + gap (20px)
            carruselRef.current.scrollBy({
                left: -itemWidth * Limite, // Desplaza hacia la izquierda por la cantidad de elementos visibles
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const carousel = carruselRef.current;
        if (!carousel) return;

        const handleScroll = () => {

            const scrollWidth = carousel.scrollWidth;
            const clientWidth = carousel.clientWidth;
            const scrollLeftPos = carousel.scrollLeft;

            const threshold = 50; 

            if (scrollLeftPos + clientWidth >= scrollWidth - threshold && category.length > Limite) {
 
            } else if (scrollLeftPos <= threshold && scrollLeftPos !== 0 && category.length > Limite) {
            }
        };

        carousel.addEventListener('scroll', handleScroll);
        return () => carousel.removeEventListener('scroll', handleScroll);
    }, [category.length, Limite]);

    const getVisibleItems = () => {
        return category; 
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + Limite) % category.length);
        if (carruselRef.current) {
            const itemWidth = 200 + 20;
            const newScrollPos = (currentIndex + Limite) * itemWidth;
            carruselRef.current.scrollTo({
                left: newScrollPos,
                behavior: 'smooth'
            });
            if (currentIndex + Limite >= category.length) {
                setTimeout(() => {
                    carruselRef.current.scrollTo({ left: 0, behavior: 'instant' });
                    setCurrentIndex(0); 
                }, 300);
            }
        }
    };

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

            if (currentIndex - Limite < 0) {
                 setTimeout(() => {
                    const lastScrollPos = (category.length - Limite) * itemWidth;
                    carruselRef.current.scrollTo({ left: lastScrollPos, behavior: 'instant' });
                    setCurrentIndex(Math.max(0, category.length - Limite)); 
                }, 300); 
            }
        }
    };

    const itemsToRender = [...category, ...category, ...category];

    return (
        <div className="carrusel-wrapper"> {/* Contenedor para las flechas y el carrusel */}
            <button className="carrusel-arrow left-arrow" onClick={handlePrev}>&#9664;</button> {/* Flecha izquierda */}
            <div className="carrusel-horizontal-wrapper" ref={carruselRef}> {/* Se le asigna la ref */}
                <div className="carrusel-horizontal">
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
            <button className="carrusel-arrow right-arrow" onClick={handleNext}>&#9654;</button> {/* Flecha derecha */}
        </div>
    );
}

export default ContCarrusel;

