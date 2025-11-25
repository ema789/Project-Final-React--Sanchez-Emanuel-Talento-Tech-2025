import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonG from "../../Button/ButtonG";
import "./form.css";

// Componente funcional que representa el formulario de producto
export function ProductFormUI({
  product,         // Objeto con los datos del producto (name, price, description, image)
  errors,          // Objeto que contiene mensajes de error de validación por campo
  loading,         // Booleano que indica si se está cargando/guardando el producto
  handleChange,    // Función que maneja cambios en inputs de texto/textarea
  handleFileChange,// Función que maneja la selección de archivo de imagen
  handleSubmit,    // Función que maneja el submit del formulario
  mode = "create", // Modo del formulario: "create" o "edit"
  onCancel         // Función para cancelar la acción y volver atrás
}) {

  const navigate = useNavigate();// Hook para redireccionar a otra ruta (no usado aquí, pero útil)

  return (
    <form onSubmit={handleSubmit} className="form-content">

      {/* Título dinámico según el modo */}
      <h2>{mode === "edit" ? "✏️ Edit Product" : "🛒 Add Product"}</h2>

      {/* Campo Nombre */}
      <div className="field">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Enter product name"
        />
        {/* Mensaje de error si existe */}
        {errors.name && <p className="error">{errors.name}</p>}
      </div>


      {/* Campo Precio */}
      <div className="field">
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Enter product price"
        />
        {errors.price && <p className="error">{errors.price}</p>}
      </div>
  <div className="field">
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="the category is required "
        />
        {errors.category && <p className="error">{errors.category}</p>}
      </div>


      {/* Campo Descripción */}
      <div className="field">
        <label>Description:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Enter a short description"
        />
        {errors.description && <p className="error">{errors.description}</p>}
      </div>

      {/* Imagen actual, solo visible en modo edición */}
      {mode === "edit" && product.image && (
        <div className="field">
          <label>Current Image:</label>
          <img
            src={product.image}
            alt="Current Product"
            className="preview-image"
          />
        </div>
      )}


      {/* Subida de imagen */}
      <div className="field">
        <label>
          {mode === "edit"
            ? "Change image (optional):"
            : "Upload product image:"}
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          placeholder={
            mode === "edit"
              ? "Select a new image only if you want to replace the current one"
              : "Choose an image for the product"
          }
        />
        {errors.image && <p className="error">{errors.image}</p>}
      </div>



      {/* Botones de acción */}
      <div className="btn-form">
        <ButtonG tipo="btn btn-add" type="submit" disabled={loading}>
          {loading
            ? "Uploading..."
            : mode === "edit"
            ? "💾 Save Changes"
            : "🛒 Add Product"}
        </ButtonG>

       <ButtonG type="button" tipo="btn btn-return" onClick={onCancel}>
          ❌ Cancel
        </ButtonG>
      </div>
    </form>
  );
}
