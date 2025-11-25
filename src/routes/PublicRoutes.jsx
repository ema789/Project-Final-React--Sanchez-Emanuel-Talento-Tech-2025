import { Route } from "react-router-dom";
import Home from "../components/Home/Home";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import Login from "../components/Login/Login";

/**
 * 📌 PublicRoutes
 * Rutas accesibles para todos los usuarios, incluso sin iniciar sesión.
 * - Home
 * - Detalle de producto
 * - Login
 */

const PublicRoutes =(
    <>
            <Route path="/" element={<Home />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="login" element={<Login />} />
    </>
    
);
export default PublicRoutes;
