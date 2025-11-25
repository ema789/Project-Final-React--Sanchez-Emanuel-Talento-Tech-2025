import { Route } from "react-router-dom";
import AdminRoute from "../components/ProtectedRoute/AdminRoute";
import AdminProducts from "../components/AdminProducts/AdminProducts";

/**
 * 🛡️ AdminRoutes
 * Rutas exclusivas para administradores.
 * AdminRoute valida que el usuario sea "admin".
 */

const AdminRoutes = (

    <>
      <Route 
        path="admin/products" 
        element={
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        } 
      />
    </>
  );
export default AdminRoutes;
