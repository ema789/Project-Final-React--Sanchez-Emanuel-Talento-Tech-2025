import { useContext } from "react";
import AuthContext from "./AuthContext";

// Hook personalizado para consumir el contexto de autenticación
// Permite acceder a `user`, `login` y `logout` fácilmente en cualquier componente
export const useAuth = () => useContext(AuthContext);
