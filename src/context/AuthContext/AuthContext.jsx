import { createContext } from "react";

// Crea un contexto de autenticación con valor inicial null.
// Este contexto será utilizado para compartir el estado del usuario y funciones de login/logout
const AuthContext = createContext(null);

export default AuthContext;
