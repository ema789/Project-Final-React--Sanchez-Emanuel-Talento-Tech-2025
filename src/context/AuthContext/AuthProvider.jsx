import React, { useState } from "react";
import AuthContext from "./AuthContext";

// Componente proveedor del contexto de autenticación
export default function AuthProvider({ children }) {

  // Estado del usuario
  // Se inicializa con el valor almacenado en localStorage si existe
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    // Retorna el usuario si existe, no es "null" y no está vacío
    return stored && stored !== "null" && stored.trim() !== "" ? stored : null;
  });

  // Función para iniciar sesión
  const login = (username) => {
    const cleanUser = username.trim().toLowerCase();// Normaliza el username
    setUser(cleanUser);                            // Actualiza el estado del usuario
    localStorage.setItem("user", cleanUser);      // Persiste el usuario en localStorage
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);                  // Limpia el estado de usuario
    localStorage.removeItem("user");// Elimina el usuario del localStorage
  };

  // Valor que se comparte a todos los componentes que consumen este contexto
  const value = { user, login, logout };
 
  // Proveedor del contexto que envuelve los hijos
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
