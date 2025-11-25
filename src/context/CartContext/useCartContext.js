import { useContext } from "react";
import { CartContext } from "./CartContext";

// Hook personalizado para acceder al carrito fácilmente desde cualquier componente
export const useCartContext = () => {
  return useContext(CartContext);
};