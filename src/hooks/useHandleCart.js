import { useRequireAuthCount } from "./useRequireAuthCount";
import { useCartContext } from "../context/CartContext/useCartContext";

/**
 * Hook personalizado para manejar la acción de agregar productos al carrito.
 * Se encarga de:
 *  - Verificar si el usuario está autenticado antes de permitir agregar al carrito.
 *  - Llamar a la función addCart del contexto del carrito.
 *
 * @param {Object|null} user - Usuario autenticado (o null si no lo está).
 * @returns {Function} handleAddCart - Función para agregar al carrito validando autenticación.
 */

export const useHandleCart = (user) => {

  // Accedemos al contexto del carrito para obtener la función addCart.
  const { addCart } = useCartContext();   

  // Hook que provee una función para validar autenticación.
  const { checkAuth } = useRequireAuthCount(user);

   /**
   * Función que intenta agregar un producto al carrito.
   * Antes valida que el usuario esté autenticado.
   *
   * @param {Object} product - Producto a agregar.
   * @param {number} count - Cantidad a agregar (por defecto 1).
   */
  const handleAddCart = (product, count = 1) => {

    // Si la autenticación falla, detenemos la acción.
    if (!checkAuth()) return;

    // Si está autenticado, agregamos el producto al carrito.
    addCart(product, count);
    
  };

  return { handleAddCart };
};
