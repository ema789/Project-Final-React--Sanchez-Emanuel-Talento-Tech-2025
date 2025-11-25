/**
 * validateProduct
 *
 * Valida los datos del producto antes de enviarlo.
 * Revisa:
 *  - Nombre obligatorio
 *  - Precio mayor a 0
 *  - Descripción de mínimo 10 caracteres
 *  - Categoría obligatoria
 *
 * @param {Object} product - Datos del producto.
 * @returns {Object} error - Errores por campo.
 */
export const validateProduct = (product) => {

  const error = {}; // Aquí se acumulan los errores

  // 1️⃣ Validar nombre
  if (!product.name?.trim()) {
    error.name = "The name is required.";
  }

  // 2️⃣ Validar precio
  // ❗ Tenías 'product.preci' → estaba mal escrito
  if (!product.price || Number(product.price) <= 0) {
    error.price = "The price must be greater than 0.";
  }

  // 3️⃣ Validar descripción
  if (!product.description?.trim() || product.description.length < 10) {
    error.description = "The description must be at least 10 characters long.";
  }

  // 4️⃣ Validar categoríase requiere la categoriaChomba rayada, fresca y cómoda, con diseño clásico y versátil.
  // ❗ Tenías 'product.cateory' → otro typo
  if (!product.category?.trim()) {
    error.category = "The category is required.";
  }

  return error;
};
