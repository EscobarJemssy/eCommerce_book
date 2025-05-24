import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Footer from "../components/Footer";
import { useCarrito } from "../components/ContCarrito";



const RECARGO_DOMICILIO = 50;

const Carrito = () => {
    const { carrito, eliminarProducto, limpiarCarrito } = useCarrito();
    const [metodo, setMetodo] = useState("local");

    const cantidad = carrito.length;
    const subtotal = carrito.reduce((acc, item) => acc + (item.price || 0), 0);
    const total = metodo === "domicilio" ? subtotal + RECARGO_DOMICILIO : subtotal;

    const navegacion = useNavigate();

    return (
        <>
            <h1>Carrito</h1>

            {/* listar productos en el carrito */}
            {carrito.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <ul>
                    {carrito.map((item, index) => (
                        <li key={index}>
                            <strong>{item.title}</strong> - {item.price}
                            <button onClick={() => eliminarProducto(item.index)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Resumen de compra */}
            {carrito.length > 0 && (
                <div>
                    <h2>Resumen de compra</h2>
                    <p>Cantidad de artÃ­culos: <strong>{cantidad}</strong></p>
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="metodo"
                                value="local"
                                checked={metodo === "local"}
                                onChange={() => setMetodo("local")}
                            />
                            Recoger en local (sin recargo)
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="metodo"
                                value="domicilio"
                                checked={metodo === "domicilio"}
                                onChange={() => setMetodo("domicilio")}
                            />
                            Entrega en domicilio (+${RECARGO_DOMICILIO})
                        </label>
                    </div>
                    <p><strong>Total a pagar: ${total.toFixed(2)}</strong></p>
                </div>
            )}

            {carrito.length > 0 && (
                <button onClick={limpiarCarrito}>Finalizar compra</button>
            )}

            <button type="button" onClick={() => { navegacion("/Libros") }}>Seguir Comprando!</button>

            <button type="button" onClick={() => { navegacion("/"); }}>Cancelar</button>

            <Footer />
        </>
    );
};

export default Carrito;