import { Routes } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";

/**
 * 🌐 AppRouter
 * Enrutador principal de la aplicación.
 * Contiene:
 * - Rutas públicas
 * - Rutas protegidas
 * - Rutas de administrador
 * 
 * Todo envuelto dentro del Layout (navbar + footer).
 */

export default function AppRouter() {
  return (
    <Layout>
      <Routes>
        {PublicRoutes}
        {ProtectedRoutes}
        {AdminRoutes}
      </Routes>
    </Layout>
  );
}
