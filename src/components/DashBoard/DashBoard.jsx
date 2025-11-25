import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/useAuth";
import ButtonG from "../Button/ButtonG";
import "../DashBoard/dashboard.css";

export default function DashBoard() {
  // 🔐 Obtengo el usuario actual y la función de cerrar sesión desde el AuthContext
  const { user, logout } = useAuth();

  // 🚪 Hook que permite redirigir entre rutas
  const navigate = useNavigate();

  // 🔚 Maneja el cierre de sesión: borra el usuario y redirige al login
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 🛡 Verifica si el usuario es administrador (solo texto "admin")
  const isAdmin = user?.trim().toLowerCase() === "admin";

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">

        {/* Título principal del panel */}
        <h1 className="dashboard-title">Control Panel</h1>

        {/* Mensaje de bienvenida mostrando el usuario actual */}
        <p className="dashboard-welcome">
          Welcome, <strong>{user}</strong>
        </p>

        {/* 🔹 Zona visible solo para administradores */}
        {isAdmin && (
          <>
            <div className="admin-container">
              <h2 className="dashboard-subtitle">
                Here you can manage your products.
              </h2>

              {/* Botón que redirige a la sección de administración de productos */}
              <ButtonG
                tipo="btn-add"
                onClick={() => navigate("/admin/products")}
              >
                🛠 Manage Products
              </ButtonG>
            </div>
          </>
        )}

        {/* 🔸 Botón visible para cualquier usuario: cerrar sesión */}
        <ButtonG tipo="btn-delete" onClick={handleLogout}>
          ✖ Log out
        </ButtonG>

      </div>
    </div>
  );
}
