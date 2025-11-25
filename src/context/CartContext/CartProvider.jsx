import { useState } from "react";
import { CartContext } from "./CartContext";

// Componente proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);// Estado que guarda los productos en el carrito

  // Verifica si un producto ya existe en el carrito por su id
  const exist = (id) => cart.some((p) => p.id === id);

  // Función para agregar un producto al carrito
  const addCart = (item, cant = 1) => {
    const newItem = {
      ...item,// (spread operator desestructurar un objeto o array)Copia todos los datos del producto
      quantity: cant,// Cantidad a agregar
      precio: Number(item.price) || 0,// Asegura que price sea número
    };

    if (exist(newItem.id)) {

      // Si el producto ya existe, solo actualiza la cantidad
      const updating = cart.map((prod) =>
        prod.id === newItem.id
          ? { ...prod, quantity: prod.quantity + newItem.quantity }
          : prod
      );
      setCart(updating);
    } else {
      // Si no existe, lo agrega al carrito
      setCart([...cart, newItem]);
    }
  };

  // Elimina un producto del carrito por su id
  const deleteItem = (id) => setCart(cart.filter((p) => p.id !== id));

  // Vacía todo el carrito
  const emptyCart = () => setCart([]);

  // Obtiene la cantidad total de elementos en el carrito
  const getTotalElements = () => cart.reduce((acc, p) => acc + p.quantity, 0);

  // Calcula el total del precio de todos los productos en el carrito
  const totalQuantityOfItem = () => {
    const total = cart.reduce((acc, p) => acc + (p.precio * p.quantity), 0);
    return Math.round(total * 100) / 100;// Redondea a 2 decimales
  }

  // Función de checkout: confirma la compra y vacía el carrito
  const checkout = () => {
    const ok = confirm("Are you sure you want to complete the purchase?");
    if (ok) {
      alert("Purchase completed!");
      emptyCart();
    }
  };

  // Retorna el proveedor del contexto con todas las funciones y el estado
  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        deleteItem,
        emptyCart,
        getTotalElements,
        totalQuantityOfItem,
        checkout,
      }}
    >
      {/* Renderiza los hijos que usan el carrito */}
      {children}
    </CartContext.Provider>
  );
};
