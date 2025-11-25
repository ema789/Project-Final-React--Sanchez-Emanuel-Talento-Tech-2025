import React from "react";

/**
 * 📑 ProductInformation
 * Renderiza nombre, precio y descripción del producto.
 */
export default function ProductInformation({ name, price, description }) {
  return (
    <>
      <div className="card-info">
        <h3 className="productCard-name">{name}</h3>
        <p className="productCard-price">$ {price}</p>
        <p className="productCard-descripction">{description}</p>
      </div>
    </>
  );
}
