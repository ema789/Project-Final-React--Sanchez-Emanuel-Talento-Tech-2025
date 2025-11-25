import { BrowserRouter as Router } from "react-router-dom";
// Contexto de autenticación (login/logout/usuario)
import AuthProvider from "../context/AuthContext/AuthProvider.jsx";
// Contexto del carrito (añadir, eliminar, total, etc.)
import { CartProvider } from "../context/CartContext/CartProvider.jsx";
// Contexto de productos (CRUD, listado, etc.)
import { ProductsProvider } from "../context/ProductsContext/ProductsProvider.jsx";

export default function AppProviders( { children } ){
    return (
        // 1️⃣ Proveedor de autenticación
        <AuthProvider>
            {/* 2️⃣ Proveedor del carrito */}
            <CartProvider>
                {/* 3️⃣ Proveedor de productos */}
                <ProductsProvider>
                    {/* 4️⃣ Router envuelve todo para poder usar rutas */}
                    <Router>
                        {/* children = toda tu App.jsx */}
                        {children}
                    </Router>
                </ProductsProvider>
            </CartProvider>
        </AuthProvider>


    );

}