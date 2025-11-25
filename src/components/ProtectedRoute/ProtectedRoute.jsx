// Este componente se usa para redirigir al usuario a otra ruta dentro de la aplicación
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/useAuth';

// Definimos el componente funcional RutaProtegida
// Recibe como props:
// - isAuthenticated: indica si el usuario está autenticado (true o false)
// - children: representa los componentes hijos que se deben mostrar si el usuario tiene acceso
export default function ProtectedRoute({ children }){
  
  const { user } = useAuth();

  // Si el usuario NO está autenticado (false),
  // se redirige automáticamente a la página de 
  // login usando <Navigate>
  // El atributo "replace" evita que el usuario pueda 
  // volver atrás con el botón del navegador
  if(!user) return <Navigate to="/login" replace/>

    // Si el usuario SÍ está autenticado,
    // se renderizan los componentes hijos 
    // (es decir, la ruta protegida)
    return children;

}