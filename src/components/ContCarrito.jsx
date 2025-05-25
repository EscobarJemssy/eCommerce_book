// Importa herramientas de React para contexto y estado
import { createContext, useContext, useState } from "react";

// Crea el contexto global del carrito
const CarritoContext = createContext();

// Hook personalizado para acceder fácilmente al contexto del carrito
export const useCarrito = () => useContext(CarritoContext);

// Proveedor del contexto, envuelve la app y gestiona el estado del carrito
export const CarritoProvider = ({ children }) => {
  // Estado principal: lista de productos en el carrito
  const [carrito, setCarrito] = useState([]);

  // Agrega un producto al carrito
  const agregarProducto = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  // Elimina un producto del carrito por su índice
  const eliminarProducto = (index) => {
    setCarrito((prev) => prev.filter((p) => p.index !== index));
  };

  // Vacía todo el carrito
  const limpiarCarrito = () => setCarrito([]);

  // Provee las funciones y el estado a los componentes hijos
  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto, eliminarProducto, limpiarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
