import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/useAuth";

export default function AdminRoute({ children }) {

   // ⛔ Obtiene el usuario autenticado desde el contexto
  const { user } = useAuth();

  // 🔍 Normaliza el nombre del usuario y verifica si es "admin"
  // trim() → elimina espacios extras
  // toLowerCase() → evita problemas si el usuario está en mayúsculas
  const isAdmin = user?.trim().toLowerCase() === "admin";

  // ❗ Si NO es administrador, redirige automáticamente al Dashboard
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✔ Si es admin, permite renderizar el contenido protegido
  return children;
}
