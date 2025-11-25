import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext/useAuth";
import ButtonG from "../Button/ButtonG"
import "../NavBar/navbar.css";

export default function Navbar() {

  // Estado que controla si el menú mobile está abierto
  //Controla si el menú móvil está abierto.
  const [open, setOpen] = useState(false);

  // Obtengo el usuario del contexto de autenticación
  //Obtiene el usuario y permite condicionar la vista.s
  const { user } = useAuth();

  // Permite saber la ruta actual
  //Detecta la ruta actual para aplicar estilos.
  const location = useLocation();

  // Verifica si estamos en Home para cambiar el estilo del navbar
  const isHome = location.pathname === "/";

  
  // Abre/cierra el menú hamburguesa
  const toggleMenu = () => setOpen(!open);

  // Cierra el menú al hacer click en un enlace
  const closeMenu = () => setOpen(false);

  return (
    <nav
      className={`navbar ${isHome ? "navbar--transparent" : "navbar--solid"}`}
    >
      <div className="navbar__wrapper">

        {/* LOGO */}
        <Link to="/" className="navbar__logo">
          MiEcommerce<span className="navbar__logo--highlight">2025</span>
        </Link>

        {/* BOTÓN HAMBURGUESA ANIMADA */}
        <ButtonG
          base={false}
          className={`navbar__toggle ${open ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </ButtonG>
        
        {/* MENÚ DE NAVEGACIÓN */}
        <ul className={`navbar__menu ${open ? "navbar__menu--active" : ""}`}>

          {/* Visible si NO sos admin */}
          {user !== "admin" && (
            <li className="navbar__item">
              <Link to="/" className="navbar__link" onClick={closeMenu}>
                Home
              </Link>
            </li>
          )}

          {/* Carrito solo si hay usuario normal */}
          {user && user !== "admin" && (
            <li className="navbar__item">
              <Link to="/cart" className="navbar__link" onClick={closeMenu}>
                Cart
              </Link>
            </li>
          )}

          {/* Ruta exclusiva de administrador */}
          {user === "admin" && (
            <li className="navbar__item">
              <Link
                to="/admin/products"
                className="navbar__link"
                onClick={closeMenu}
              >
                Manage Products
              </Link>
            </li>
          )}

          {/* Login / Logout dinámico */}
          {user ? (
            <li className="navbar__item">
              <Link
                to="/dashboard"
                className="navbar__link"
                onClick={closeMenu}
              >
                Logout
              </Link>
            </li>
          ) : (
            <li className="navbar__item">
              <Link to="/login" className="navbar__link" onClick={closeMenu}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
