import { API_URL } from "../config/apiConfig";

// -------------------------------------
// Timeout opcional
// -------------------------------------
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timeout")), ms);
  });
}

// -------------------------------------
// Helper general
// -------------------------------------
async function request(url, options = {}) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 10000);

    const res = await Promise.race([
      fetch(url, { ...options, signal: controller.signal }),
      timeout(10000),
    ]);

    clearTimeout(id);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Error HTTP ${res.status}`);
    }

    return res.status !== 204 ? res.json() : true;
  } catch (error) {
    console.error("❌ Error en request:", error);
    throw error;
  }
}

// -------------------------------------
// 📌 API
// -------------------------------------

export function getProducts() {
  return request(API_URL);
}

export function getProductById(id) {
  return request(`${API_URL}/${id}`);
}

export function createProduct(product) {
  return request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
}

export function updateProduct(id, productUpdated) {
  return request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productUpdated),
  });
}

export function deleteProduct(id) {
  return request(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  
}
