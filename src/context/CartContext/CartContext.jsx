import { createContext } from "react";

// Crea un contexto para el carrito de compras.
// Valor inicial null porque al inicio no hay carrito definido.
export const CartContext = createContext(null);
