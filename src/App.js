import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inicio from './views/Inicio';
import Carrito from './views/Carrito';
import Libros from './views/Libros';
import DetallesLibros from './views/DetallesLibros';
import { CarritoProvider } from './components/ContCarrito';
import img from "./assets/logo.jpeg"; 

function App() {
  return (
    
    <CarritoProvider>
      <Router>
        <header>
          <nav> 
            <img src={img} alt='Logo' />
            <p style={{ fontFamily: 'Bahnschrift Light', fontSize: 22 }}>Guardián de libros</p>
            <Link to="/">Inicio</Link>
            <Link to="/Carrito">Carrito</Link> 
            <Link to="/Libros">Libros</Link>
          </nav>
        </header>   

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Carrito" element={<Carrito />} />
          <Route path="/Libros" element={<Libros />} />
          <Route path="/DetalleLibro/:index" element={<DetallesLibros />} />
        </Routes>
      </Router>
    </CarritoProvider>
  );
}

export default App;