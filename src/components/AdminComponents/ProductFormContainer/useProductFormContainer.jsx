import { useState, useEffect } from "react";
import { processProduct } from "../../../utils/processProduct"; // Función que procesa el producto (validación, subida de imagen, etc.)

/**
 * 🔹 Hook personalizado para manejar el estado y la lógica de un formulario de producto
 * 
 * Props:
 * - initialProduct: producto inicial para editar (null si es nuevo)
 * - onSuccess: callback cuando el producto se procesa correctamente
 * - onCancel: callback si se cancela
 */
export function useProductFormContainer({ initialProduct = null, onSuccess, onCancel }) {
  
  // 🔹 Estructura por defecto de un producto
  const emptyProduct = {
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  };

  // 🔹 Estados locales
  const [product, setProduct] = useState(initialProduct || emptyProduct); // datos del formulario
  const [file, setFile] = useState(null); // archivo de imagen
  const [errors, setErrors] = useState({}); // errores de validación
  const [loading, setLoading] = useState(false); // estado de carga

  // 🔹 Resetea el formulario si cambia initialProduct
  useEffect(() => {
    setProduct(initialProduct || emptyProduct);
    setFile(null);
    setErrors({});
  }, [initialProduct]);

  // 🔹 Actualiza el estado del producto al cambiar los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Maneja la selección de archivo
  const handleFileChange = (e) => {
    const fileSelected = e.target.files?.[0];
    if (!fileSelected) return;
    setFile(fileSelected);
  };

  // 🔹 Maneja el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔹 Procesa el producto (validación, subida de imagen)
    const { finalProduct, error } = await processProduct(product, file);
    setErrors(error || {});

    if (!finalProduct) {
      setLoading(false);
      return;
    }

    try {
      // 🚀 Informa al padre que se procesó correctamente
      onSuccess?.(finalProduct);

      if (!initialProduct) {
        // reset solo si es un producto nuevo
        setProduct(emptyProduct);
      }

      setFile(null);
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("❌ Error processing the product");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Valores y funciones que expone el hook
  return {
    product,
    file,
    errors,
    loading,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
}
