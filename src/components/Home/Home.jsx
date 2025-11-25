import React from "react";
import Products from "../Products/Products";
import "../Home/home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* 🟦 Hero principal: sección superior con imagen + overlay */}
      <div className="home-hero">
        {/* Capa oscura para mejorar contraste sobre la imagen */}
        <div className="home-dark-overlay"></div>
        {/* Contenedor del texto sobre la imagen */}
        <div className="home-overlay">
          <h1 className="home-title">Welcome to my ecommerce</h1>
          <p className="home-descripcion">
            
Discover quality products selected especially for you.
          </p>
        </div>
      </div>
      {/* 🟦 Sección de productos destacados */}
      <div className="product-content">
        <h2 className="product-title">featured product</h2>
        {/* Componente Products: renderiza todas las cards de productos */}
        <Products />

      </div>
    </div>
  );
}
