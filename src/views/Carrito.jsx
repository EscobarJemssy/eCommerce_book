import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Footer from "../components/Footer";
import { useCarrito } from "../components/ContCarrito"; // Asegúrate de que la ruta sea correcta
import "../css/Carrito.css"; // Asegúrate de que la ruta sea correcta

const RECARGO_DOMICILIO = 50;

const Carrito = () => {
  const { carrito, eliminarProducto, limpiarCarrito } = useCarrito();
  const [metodo, setMetodo] = useState("local");
  const [tarjeta, setTarjeta] = useState("");

  const cantidad = carrito.length;
  // Asegúrate de que item.price sea un número. Si es string, conviértelo.
  const subtotal = carrito.reduce((acc, item) => acc + (parseFloat(item.price.replace('$', '')) || 0), 0); // Asumiendo que price viene como "$XX.XX"
  const total = metodo === "domicilio" ? subtotal + RECARGO_DOMICILIO : subtotal;

  const navegacion = useNavigate();

  const handleFinalizarCompra = () => {
    if (!tarjeta || tarjeta.length < 12) { // Validación de longitud mínima de tarjeta
      alert("Por favor ingresa un número de tarjeta válido (al menos 12 dígitos).");
      return;
    }
    // Simula resultado aleatorio (1: éxito, 0: error)
    const resultado = Math.floor(Math.random() * 2); // 0 o 1
    if (resultado === 1) {
      limpiarCarrito();
      setTarjeta("");
      alert("¡Compra realizada con éxito!");
      navegacion("/"); // O a una página de confirmación
    } else {
      setTarjeta("");
      alert("Error con la tarjeta. Intenta de nuevo.");
    }
  };

  return (
    <>
      <div className="carrito-page-container"> {/* Contenedor principal de la página del carrito */}
        <h1 className="page-title">Tu Carrito de Compras</h1> {/* Clase para el título de la página */}

        {/* Listar productos en el carrito */}
        {carrito.length === 0 ? (
          <div className="empty-cart-message card"> {/* Estilo de tarjeta para mensaje de vacío */}
            <p>No hay productos en el carrito.</p>
            <button className="btn btn-primary" onClick={() => navegacion("/Libros")}>
              Explorar Libros
            </button>
          </div>
        ) : (
          <div className="carrito-content-wrapper"> {/* Nuevo div para contener la lista y el resumen */}
            <ul className="carrito-lista"> {/* Clase para la lista de productos */}
              {carrito.map((item, index) => (
                <li key={index} className="carrito-item"> {/* Clase para cada item del carrito */}
                  <div className="item-details">
                    <img src={item.images} alt={item.title} className="item-image" /> {/* Asegúrate que item.image exista */}
                    <div className="item-info">
                      <h3 className="item-title">{item.title}</h3>
                      <p className="item-price">${parseFloat(item.price.replace('$', '')).toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => eliminarProducto(item.index)}
                    className="btn btn-danger btn-sm" // Clases para botones de acción (eliminar)
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            {/* Resumen de compra */}
            <div className="resumen-compra card"> {/* Clase para el resumen de compra */}
              <h2>Resumen del Pedido</h2>
              <p>Cantidad de artículos: <strong className="summary-value">{cantidad}</strong></p>
              <p>Subtotal: <strong className="summary-value">${subtotal.toFixed(2)}</strong></p>

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

              {/* Input para el número de tarjeta */}
              <input
                type="number"
                placeholder="Número de tarjeta (solo números)"
                value={tarjeta}
                onChange={e => setTarjeta(e.target.value)}
                className="input-field" // Clase para inputs
              // minLength={12} // minLength y maxLength no funcionan bien con type="number"
              // maxLength={19}
              />
            </div>
          </div>
        )}

        <div className="cart-actions"> {/* Contenedor para botones de acción */}
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

        <Footer />
      </div>
    </>
  );
};

export default Carrito;