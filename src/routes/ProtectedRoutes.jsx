import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import DashBoard from "../components/DashBoard/DashBoard";
import Cart from "../components/Cart/Cart";

/**
 * 🔐 ProtectedRoutes
 * Rutas a las que solo puede acceder un usuario autenticado.
 * Se usa <ProtectedRoute> como wrapper para bloquear acceso.
 */
const  ProtectedRoutes = ( 
    <>
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }
      />
    </>
  );

export default ProtectedRoutes;
