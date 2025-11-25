// src/utils/procesarProducto.js
import { validateProduct } from "./validateProduct.js";
import { uploadToImgbb } from "../service/fileToBase64.js";

/**
 * Valida y procesa un producto antes de enviarlo.
 *
 * Funciones que realiza:
 *  1. Validar los datos del producto.
 *  2. Mantener la imagen existente si no se carga una nueva.
 *  3. Subir la nueva imagen a imgbb si el usuario seleccionó un archivo.
 *  4. Devolver un producto final completamente procesado y libre de errores.
 *
 * @param {Object} product - Objeto con los datos del producto.
 * @param {File|null} file - Archivo de imagen cargado por el usuario (opcional).
 *
 * @returns {Promise<{ finalProduct: Object|null, error: Object }>}
 *   - finalProduct → producto listo para enviar al backend.
 *   - error → objeto con mensajes de error si ocurre algún problema.
 */

export const processProduct = async (product, file) => {

  // 1️⃣ VALIDAR EL PRODUCTO
  // validateProduct devuelve un objeto "error", vacío si no hay errores.
  const error = validateProduct(product);

  // Si existen errores de validación, detenemos aquí.
  if (Object.keys(error).length > 0) {
    return { finalProduct: null, error };
  }

  // 2️⃣ MANTENER LA IMAGEN EXISTENTE SI NO SE SUBE UNA NUEVA
  // Si el producto ya tenía una imagen, la conservamos.
  let urlImage = product.image || "";

  // 3️⃣ SUBIR IMAGEN SOLO SI EL USUARIO SELECCIONÓ UN NUEVO ARCHIVO
  if (file) {
    try {
      // uploadToImgbb convierte la imagen a base64 y la sube a imgbb.
      urlImage = await uploadToImgbb(file);
    } catch (err) {
      // Si la subida falla, devolvemos error específico.
      return { finalProduct: null, error: { image: "Error uploading image" } };
    }
  }

  // 4️⃣ RETORNAR PRODUCTO FINAL PROCESADO
  return {
    finalProduct: { ...product, image: urlImage },
    error: {},
  };
};