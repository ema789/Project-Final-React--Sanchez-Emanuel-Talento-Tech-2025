import { useNavigate } from "react-router-dom";

/**
 * Hook que valida si el usuario está autenticado antes de ejecutar una acción.
 * Si el usuario no está logueado:
 *   - Muestra un mensaje de confirmación.
 *   - Si acepta, lo redirige a la página de login.
 *
 * Este hook es usado por otros hooks o funciones que requieren verificar
 * la autenticación antes de continuar (por ejemplo, agregar al carrito).
 *
 * @param {Object|null} user - Usuario autenticado o null.
 * @returns {Function} checkAuth - Función que valida autenticación.
 */
export const useRequireAuthCount = (user) => { 

    // Hook para navegar entre rutas de React Router.
    const navigate = useNavigate();


        
    /**
     * Verifica si el usuario está autenticado.
     *
     * Si no lo está:
     *   - Muestra un diálogo confirm para preguntar si desea iniciar sesión.
     *   - Si el usuario acepta, lo redirige al login.
     *   - Devuelve false para indicar que la operación debe cancelarse.
     *
     * Si el usuario está autenticado:
     *   - Devuelve true y permite continuar la acción.
     *
     * @returns {boolean} true si el usuario está autenticado, false si no.
     
    */
    const checkAuth = () => {
        if(!user) {
            const confirm = confirm( 
                "You must log in to continue. Do you want to do it now?"
            );
            if(confirm) navigate("/login");
            return false; // La acción que llamó a checkAuth se debe cancelar
        }
        return true; // Usuario autenticado
    };

    return { checkAuth };

}

/** 

📝 Notas importantes

Este hook no maneja el estado del usuario, solo lo valida.

La responsabilidad de manejar user corresponde al AuthContext o proveedor que uses.

Es una buena práctica envolver acciones críticas con checkAuth().

**/