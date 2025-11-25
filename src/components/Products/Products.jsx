import { useCartContext } from "../../context/CartContext/useCartContext";
import { useAuth } from "../../context/AuthContext/useAuth";
import { useProducts } from "../../context/ProductsContext/useProducts";
import CardProducts from "../CardProduct/CardProducts";

/**
 * 🛒 Products Component
 * Encargado de:
 * - Obtener productos desde el ProductsContext
 * - Aplicar filtros dinámicos (función o categoría)
 * - Aplicar filtro por búsqueda
 * - Manejar estados: loading, error, lista vacía
 * - Renderizar CardProducts con props flexibles
 */

export default function Products({
  showButtonCart = true,// Mostrar u ocultar el botón "Agregar al carrito"
  onAddCart,// Acción personalizada al agregar al carrito
  onEditProduct,// Acción personalizada para editar (modo admin)
  showButtonEdit = false,// Habilita botón de edición
  filter= "",// Filtro dinámico (string categoría o función)
  search="",// Texto de búsqueda
}) {
  const { addCart } = useCartContext();// Acceso a la función global de carrito
  const { user } = useAuth();// Usuario logueado (importante si es admin)
  const { products, loading, error } = useProducts();// Productos del contexto global

  // Evitamos errores si products es null o undefined
  const productList = products || [];

  // Copiamos para aplicar filtros sin mutar el estado original
  let filteredProducts = [...productList];

  // 🔎 Filtro opcional: puede ser una función o una categoría
  if (filter) {
    if (typeof filter === "function") {
      filteredProducts = filteredProducts.filter(filter);
    } else {
      filteredProducts = filteredProducts.filter(p => p.category === filter);
    }
  }

  // 🔎 Filtro por búsqueda (por nombre)
  if (search) {
    filteredProducts = filteredProducts.filter(p =>
      p?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 🔄 Estados: carga, error o lista vacía
  if (loading) return <p className="been charging">Loading products...</p>;
  if (error) return <p className="been error">⚠️ Error: {error}</p>;
if (!productList.length) return <p className="been empty">There are no products available</p>;

  // No hay resultados con filtros aplicados
  if (!filteredProducts.length) return <p className="been empty">No products match your filters/search</p>;

  // 🎨 Render final usando el componente de tarjetas
  return (
    <CardProducts
      products={filteredProducts}
      addToCart={addCart}
      showButtonCart={showButtonCart}
      showButtonEdit={showButtonEdit}
      onEditProduct={onEditProduct}
      user={user}
      onAddCart={onAddCart}
    />
  );
}
