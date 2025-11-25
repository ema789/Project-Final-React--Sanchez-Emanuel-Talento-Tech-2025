import React, { useState } from "react";
import ButtonG from "../../Button/ButtonG";
import { useHandleCart } from "../../../hooks/useHandleCart";
import Count from "../../Count/Count";

/**
 * 🎛️ ProductButtons
 * Controla los botones según:
 * - modo detalle
 * - modo admin
 * - usuario logueado
 *
 * Incluye:
 * - Agregar al carrito con contador
 * - Editar producto (admin)
 * - Eliminar producto (admin)
 */

export default function ProductButtons({
  product,
  detailMode,
  showShoppingCartButton = true,
  showButtons,
  user,
  onEditProduct,
  onDelete,
  navigate,
}) {
  const { handleAddCart } = useHandleCart(user);
  const [amount, setAmount] = useState(1);// Cantidad seleccionada

  return (

    <div className="btns-content">

      {/* ⭐ MODO CLIENTE - Detalle del producto */}
      {detailMode && (
        <>
          {/* Cliente logueado → agregar al carrito */}
          {user && user !== "admin" && showShoppingCartButton && (
            <div className="btn-client">
              <Count initial={1} min={1} max={10} onConfirm={setAmount} />

              <ButtonG
                tipo="btn-add"
                onClick={() => handleAddCart(product, amount)}
              >
                🛒 Add {amount}
              </ButtonG>
            </div>
          )}

          {/* Return siempre en detalle, solo cuando NO es admin */}
          {!user && (
            <ButtonG
              tipo="btn-return"
              stopPropagation
              onClick={() => navigate("/")}
            >
              ⬅️ Return
            </ButtonG>
          )}
        </>
      )}

      {/* ⭐ MODO ADMIN: Editar / Eliminar */}
      {showButtons && user === "admin" && (
        <div className="btn-admin">
          {onEditProduct && (
            <ButtonG tipo="btn-edit" stopPropagation onClick={onEditProduct}>
              ✏️  Edit
            </ButtonG>
          )}

          {onDelete && (
            <ButtonG tipo="btn-delete" stopPropagation onClick={onDelete}>
              🗑️Delete
            </ButtonG>
          )}
        </div>
      )}
    </div>
  );
}
