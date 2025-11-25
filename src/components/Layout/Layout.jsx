// Layout.jsx
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import "./layout.css";

// Componente Layout
// Este componente envuelve TODA la aplicación y garantiza que
// tanto el Navbar como el Footer aparezcan en todas las páginas.
export default function Layout({ children }) {
  return (
    
    // Contenedor general del layout
    // Permite estructurar toda la página (navbar + contenido + footer)
    <div className="layout-container">

      {/* Navbar fijo en todas las páginas */}
      <Navbar />
       
      {/* Aquí se renderiza dinámicamente el contenido según la ruta actual */}
      <main className="layout-content">
        {children}
      </main>
      
      {/* Footer fijo en todas las páginas */}
      <Footer />
    </div>
  );
}
