import { useState, useEffect } from "react";
import ButtonG from "../Button/ButtonG";

/**
 * ⭐ Count Component
 * 
 * Componente contador reutilizable.
 * Permite:
 * - aumentar cantidad
 * - disminuir cantidad
 * - validar límites min y max
 * - notificar el valor al padre mediante onConfirm
 */

export default function Count({
  onConfirm,   // Función que recibe el valor actual del contador
  initial = 0, // Cantidad inicial
  min = 0,     // Cantidad mínima permitida
  max = Infinity, // Cantidad máxima permitida
}) {
  
  // Estado interno del contador
  const [count, setCount] = useState(initial);

  // Incrementar dentro del rango permitido
  const increase = () => {
    if (count < max) setCount((prev) => prev + 1);
  };

  // Disminuir dentro del rango permitido
  const decrease = () => {
    if (count > min) setCount((prev) => prev - 1);
  };

  // Confirmar cantidad manualmente (ya no se usa porque el useEffect reemplaza su utilidad)
  const handleConfirm = () => {
    if (count > 0 && onConfirm) onConfirm(count);
  };

  /**
   * 🔄 Cada vez que count cambia,
   * ejecutamos automáticamente onConfirm(count)
   * Esto mantiene el valor sincronizado con el componente padre.
   */
  useEffect(() => {
    if (onConfirm) onConfirm(count);
  }, [count, onConfirm]);

  return (
    <div className="count-btns">
      
      {/* Botón para disminuir */}
      <ButtonG
        base={false} // desactivar estilos globales, usa clases personalizadas
        tipo="btn-count btn-count-sub"
        onClick={decrease}
        disabled={count <= min}
        aria-label="Disminuir cantidad"
        title="Disminuir cantidad"
      >
        −
      </ButtonG>

      {/* Valor actual */}
      <span className="count-value" aria-live="polite">
        {count}
      </span>

      {/* Botón para aumentar */}
      <ButtonG
        base={false}
        tipo="btn-count btn-count-add"
        onClick={increase}
        disabled={count >= max}
        aria-label="Aumentar cantidad"
        title="Aumentar cantidad"
      >
        +
      </ButtonG>
    </div>
  );
}
