import React from "react";
import "../cardProducts.css"


/**
 * 🖼️ ProductImage
 * Muestra la imagen del producto y maneja errores
 */
export default function ProductImage({ src, name }){
    return(
        <div className="product--content__img">

                  <img 
            src={src} 
            alt={name}
            className="product-img"
            // Si la imagen falla, usamos un placeholder
            onError={(e)=>(e.target.src = "/placeholder.jpg")} 
        />


        </div>
  
    );
};