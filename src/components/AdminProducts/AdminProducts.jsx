import { useState } from "react";
// Contextos de productos y autenticación
import { useProducts } from "../../context/ProductsContext/useProducts";
import { useAuth } from "../../context/AuthContext/useAuth";

import CardProducts from "../CardProduct/CardProducts"; // Componente que renderiza cards de productos
import FormProduct from "../FormProduct/FormProduct";   // Formulario para crear/editar producto
import ButtonG from "../Button/ButtonG";               // Botón reutilizable

import "./adminComponents.css";

export default function AdminProducts() {
  // 🔹 Hooks de contexto
  const { products, handleAdd, handleEdit, handleDelete } = useProducts();
  const { user } = useAuth();

  // 🔹 Estado local para manejar el producto en edición y mostrar el formulario
  const [productEdit, setProductEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // 🔹 Función para eliminar un producto (con confirmación)
  const handleDeleteProduct = async (prod) => {
    const confirmDelete = confirm(`Delete the product "${prod.name}"?`);
    if (!confirmDelete) return;

    await handleDelete(prod.id);
  };

  // 🔹 Función para agregar o editar productos según el estado
  const handleUpdate = async (finalProduct) => {
    try {
      if (productEdit) {
        await handleEdit(finalProduct);
        alert("✅ Product updated");
      } else {
        await handleAdd(finalProduct);
        alert("✅ Product created");
      }
    } catch (err) {
      console.error("❌ Error saving product:", err);
      alert("❌ Error saving product");
    } finally {
      // Limpiar estado y ocultar formulario
      setProductEdit(null);
      setShowForm(false);
    }
  };

  // 🔹 Cancelar edición / creación
  const handleCancel = () => {
    setProductEdit(null);
    setShowForm(false);
  };

  return (
    <div className="adminProd-wrapper">
      <h1 className="admin-title">Admin Products</h1>

      {/* Botón para crear un nuevo producto */}
      <ButtonG
        tipo="btn-add"
        onClick={() => {
          setProductEdit(null);
          setShowForm(true);
        }}
      >
        ➕ Crear Producto
      </ButtonG>

      {/* Formulario de creación/edición */}
      {showForm && (
        <div className="admin-form-container">
          <FormProduct
            initialProduct={productEdit}
            onSuccess={handleUpdate}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Lista de productos en modo admin */}
      <div className="admin-list">
        <CardProducts
          products={products}
          user={user}
          adminMode={true}              // Activa funcionalidades de admin (editar/eliminar)
          showButtons={true}            // Muestra botones de edición y eliminación
          showShoppingCartButton={false} // Oculta botones de agregar al carrito
          onEditProduct={(p) => {
            setProductEdit(p);
            setShowForm(true);
          }}
          onDelete={handleDeleteProduct}
        />
      </div>
    </div>
  );
}
