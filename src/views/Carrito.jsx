import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Footer from "../components/Footer";
import { useCarrito } from "../components/ContCarrito";
import "../css/Carrito.css";

const RECARGO_DOMICILIO = 15;

const Carrito = () => {
  // Obtiene el carrito y funciones para manipularlo desde el contexto global
  const { carrito, eliminarProducto, limpiarCarrito } = useCarrito();

  // Estados para los datos del comprador y método de envío
  const [metodo, setMetodo] = useState("local");
  const [tarjeta, setTarjeta] = useState("");
  const [nombre, setNombre] = useState("");
  const [presupuesto, setPresupuesto] = useState("");

  // Calcula cantidad, subtotal y total según el método de envío
  const cantidad = carrito.length;
  const subtotal = carrito.reduce((acc, item) => acc + (parseFloat(item.price.replace('$', '')) || 0), 0);
  const total = metodo === "domicilio" ? subtotal + RECARGO_DOMICILIO : subtotal;

  const navegacion = useNavigate();

  // Valida los datos y finaliza la compra
  const handleFinalizarCompra = () => {
    if (!nombre.trim()) {
      alert("Por favor ingresa tu nombre.");
      return;
    }
    if (!presupuesto || isNaN(presupuesto) || Number(presupuesto) < 0) {
      alert("Por favor ingresa un presupuesto válido.");
      return;
    }
    if (Number(presupuesto) < total) {
      alert("Tu presupuesto es insuficiente para realizar la compra.");
      return;
    }
    if (!tarjeta || tarjeta.length < 10) {
      alert("Por favor ingresa un número de tarjeta válido (al menos 10 dígitos).");
      return;
    }
    // Limpia el carrito y los campos, muestra mensaje y redirige al inicio
    limpiarCarrito();
    setTarjeta("");
    setNombre("");
    setPresupuesto("");
    alert("¡Compra realizada con éxito!");
    navegacion("/");
  };

  return (
    <>
      <div className="carrito-page-container">
        <h1 className="page-title">Tu Carrito de Compras</h1>

        {/* Si el carrito está vacío, muestra mensaje y botón para explorar */}
        {carrito.length === 0 ? (
          <div className="empty-cart-message card">
            <p>No hay productos en el carrito.</p>
            <button className="btn btn-primary" onClick={() => navegacion("/Libros")}>
              Explorar Libros
            </button>
          </div>
        ) : (
          // Si hay productos, muestra la lista y el resumen de compra
          <div className="carrito-content-wrapper">
            <ul className="carrito-lista">
              {carrito.map((item, index) => (
                <li key={index} className="carrito-item">
                  <div className="item-details">
                    {/* Imagen y datos del libro */}
                    <img src={item.image || 'https://via.placeholder.com/60x90?text=Libro'} alt={item.title} className="item-image" />
                    <div className="item-info">
                      <h3 className="item-title">{item.title}</h3>
                      <p className="item-price">${parseFloat(item.price.replace('$', '')).toFixed(2)}</p>
                    </div>
                  </div>
                  {/* Botón para eliminar producto */}
                  <button
                    onClick={() => eliminarProducto(item.index)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            {/* Resumen de compra y formulario de datos */}
            <div className="resumen-compra card">
              <h2>Resumen del Pedido</h2>
              <p>Cantidad de artículos: <strong className="summary-value">{cantidad}</strong></p>
              <p>Subtotal: <strong className="summary-value">${subtotal.toFixed(2)}</strong></p>

              {/* Selección de método de envío */}
              <div className="metodo-envio-options">
                <h3>Método de Envío</h3>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="metodo"
                    value="local"
                    checked={metodo === "local"}
                    onChange={() => setMetodo("local")}
                  />
                  Recoger en local (sin recargo)
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="metodo"
                    value="domicilio"
                    checked={metodo === "domicilio"}
                    onChange={() => setMetodo("domicilio")}
                  />
                  Entrega en domicilio (<span className="delivery-cost">+${RECARGO_DOMICILIO}</span>)
                </label>
              </div>

              <p className="total-label">
                <strong>Total a pagar: <span className="total-value">${total.toFixed(2)}</span></strong>
              </p>

              {/* Campos para datos del comprador */}
              <div className="comprador-fields">
                <input
                  type="text"
                  placeholder="Nombre del comprador"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  className="input-field"
                />
                <input
                  type="number"
                  placeholder="Presupuesto máximo"
                  value={presupuesto}
                  min={0}
                  onChange={e => setPresupuesto(e.target.value)}
                  className="input-field"
                />
                <input
                  type="number"
                  placeholder="Número de tarjeta (solo números)"
                  value={tarjeta}
                  onChange={e => setTarjeta(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="cart-actions">
          <button type="button" onClick={() => navegacion("/Libros")} className="btn btn-secondary">
            Seguir Comprando
          </button>
          <button type="button" onClick={() => navegacion("/")} className="btn btn-outline">
            Cancelar
          </button>
          {carrito.length > 0 && (
            <button onClick={handleFinalizarCompra} className="btn btn-primary">
              Finalizar Compra
            </button>
          )}
        </div>

        {/* Pie de página */}
        <Footer />
      </div>
    </>
  );
};

export default Carrito;