import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";

// Hook personalizado para consumir ProductsContext
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts debe usarse dentro de un ProductsProvider");
  }
  return context;
};
