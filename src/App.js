import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // ✅ IMPORTACIÓN NECESARIA
import Inicio from './views/Inicio';
import Carrito from './views/Carrito';
import Libros from './views/Libros';
import DetallesLibros from './views/DetallesLibros';

function App() {
  return (
    <Router>
      <header>
        <nav>
          <img src='' alt=''></img>
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
  );
}

export default App;