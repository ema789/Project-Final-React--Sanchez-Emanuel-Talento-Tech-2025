import { useNavigate } from "react-router-dom";

import ProductImage from "./components/ProductImage";
import ProductButtons from "./components/ProductButtons";
import ProductInformation from "./components/ProductInformation";
import "./cardProducts.css";

/**
 * 📦 CardProducts
 * Componente principal que renderiza una lista de productos o un solo producto,
 * reutilizado tanto para el modo "lista", "detalle" y "admin".
 *
 * Props:
 * - products: array de productos
 * - product: un solo producto (modo detalle)
 * - user: usuario logueado
 * - adminMode: si el admin está gestionando productos
 * - detailMode: si estamos en la vista de detalle
 * - showButtons: si se muestran botones de edición/eliminación
 * - showShoppingCartButton: si aparece el botón de agregar al carrito
 * - addToCart: acción para agregar al carrito
 * - onEditProduct, onDelete: acciones admin
 */

export default function CardProducts ({
    products=[],
    product =null,
    user,
    adminMode = false,
    detailMode=false,
    showButtons= false,
    showShoppingCartButton=true,
    addToCart,
    onEditProduct,
    onDelete,
}){


    const navigate = useNavigate();

    // Si llega un solo producto → lo transformamos en una lista
    const listProducts = product ? [product] : products;

    return(
        <div className={`products-container ${detailMode ? "detail-mode " : ""} `} >

            {listProducts.map((prod) =>(
                <div    key={prod.id}
                        className={`product-card ${detailMode ? "detail" : ""}`}
                        // Navegación al detalle SOLO si no estamos en admin ni en modo detalle
                        onClick={()=>{if(!detailMode && !adminMode) navigate(`/products/${prod.id}`)}}
                >
                    {/** Imagen del Producto **/}
                    <ProductImage src={prod.image} name={prod.name}/>

                     {/* 📑 Información del producto */}

                    <ProductInformation {...prod}/>

                    {/* 🔘 Botones según modo */}
                    <ProductButtons 
                        product={prod}
                        adminMode = {adminMode}
                        detailMode={detailMode}
                        showShoppingCartButton={showShoppingCartButton}
                        showButtons={showButtons}
                        addToCart={addToCart}
                        user={user}
                        onEditProduct={()=> onEditProduct?.(prod)}
                        onDelete={()=> onDelete?.(prod)}
                        navigate={navigate}
                    />

                </div>
            ))}

            
        </div>
    );


}