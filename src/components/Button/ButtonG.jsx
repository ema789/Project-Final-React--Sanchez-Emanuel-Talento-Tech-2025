import React from "react";
import "./buttonG.css"; // Estilos globales para botones

export default function ButtonG({
  children,         // Contenido interno del botón (texto, emojis, íconos)
  onClick,          // Función que se ejecuta al hacer clic
  tipo = "primary", // Clase visual que define el tipo de botón (primary, danger, etc.)
  className = "",   // Clases adicionales opcionales
  disabled = false, // Deshabilita el botón si es true
  stopPropagation = false, // Evita que el click afecte al contenedor padre
  type = "button",  // Tipo del botón (button, submit, reset)
  base = true,      // Si debe incluir la clase base "btn" para estilos globales
}) {
  
  // Maneja el clic del botón
  const handleClick = (e) => {
    // Evita que el evento burbujee y active eventos del padre (útil en cards)
    if (stopPropagation) e.stopPropagation();

    // Ejecuta la función pasada por props si existe
    onClick?.(e);
  };

  return (
    <button
      className={`${base ? "btn" : ""} ${tipo} ${className}`} // Combina clases dinámicamente
      onClick={handleClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
