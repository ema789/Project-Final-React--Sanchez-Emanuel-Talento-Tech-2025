import { useState, useEffect } from "react";
import { ProductsContext } from "./ProductsContext";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../service/productService";

// Proveedor de ProductsContext
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Lista de productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // --------------------------------------------------
  // 🔹 Obtener todos los productos
  // --------------------------------------------------
useEffect(() => {
  getProducts()
    .then(data => {
      setProducts(data);
      setError(null);
    })
    .catch(err => {
      console.error("❌ Error retrieving products:", err);
      setError(err.message);
    })
    .finally(() => setLoading(false));
}, []);



  // 🔹 Obtener uno por ID
  const fetchProductoById = async (id) => {
    try {
      return await getProductById(id);
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  // 🔹 Crear producto
  const handleAdd = async (newProduct) => {
    try {
      const created = await createProduct(newProduct);
      setProducts((prev) => [...prev, created]);
    } catch (err) {
      console.error("❌ Error adding product:", err);
      setError(err.message);
    }
  };

  // 🔹 Editar producto
  const handleEdit = async (productEdit) => {
    try {
      const updated = await updateProduct(productEdit.id, productEdit);
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
    } catch (err) {
      console.error("❌ Product update error:", err);
      setError(err.message);
    }
  };

  // 🔹 Eliminar producto
  const handleDelete = async (id) => {
    try {
      const deleted = await deleteProduct(id);
      if (deleted) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      setError(err.message);
    }
  };

  // 🔹 Recargar productos
  const rechargeProducts = async () => fetchProducts();

  

  // Valor compartido a través del contexto
  const value = {
    products,
    fetchProductoById,
    loading,
    error,
    handleAdd,
    handleEdit,
    handleDelete,
    rechargeProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
