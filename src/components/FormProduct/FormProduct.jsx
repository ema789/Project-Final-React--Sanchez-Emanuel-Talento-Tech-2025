import { ProductFormUI } from "../AdminComponents/ProductFormUI/ProductFormUI";
// Importa el componente de UI del formulario de productos

import { useProductFormContainer } from "../AdminComponents/ProductFormContainer/useProductFormContainer";
// Importa el hook que maneja la lógica del formulario (estado, validación, envío, etc.)

// Componente funcional que renderiza el formulario de producto
export default function FormProduct({ initialProduct = null, onSuccess, onCancel }) {
  
  // Llama al hook de lógica, pasando el producto inicial (si existe) y la función a ejecutar después de guardar
  const form = useProductFormContainer({ initialProduct, onSuccess });

  return (
    <ProductFormUI
      product={form.product}               // Datos del producto
      errors={form.errors}                 // Errores de validación
      loading={form.loading}               // Estado de carga
      handleChange={form.handleChange}     // Función para cambios en inputs/textarea
      handleFileChange={form.handleFileChange} // Función para cambios de archivo
      handleSubmit={form.handleSubmit}     // Función para enviar formulario
      mode={initialProduct ? "edit" : "create"} // Determina si es edición o creación
      onCancel={onCancel}                  // Función para cancelar la acción
    />
  );
}
