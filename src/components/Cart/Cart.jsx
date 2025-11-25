import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext/useCartContext";
import ButtonG from "../Button/ButtonG";

import "../Cart/cart.css";

export default function Cart() {

    // Obtenemos del contexto del carrito:
  // - cart: lista de items en el carrito
  // - emptyCart: vacía completamente el carrito
  // - deleteItem: elimina un producto por su ID
  // - totalQuantityOfItem: retorna el total a pagar
  // - checkout: simula completar la compra
  const { cart, emptyCart, deleteItem, totalQuantityOfItem, checkout } =
    useCartContext();

  return (
    <div className="cart-container">
      <div className="cart-content">
        <h2 className="cart-subtitle">🛒 Shopping cart</h2>

        {/* 🔹 Si el carrito está vacío mostramos aviso y botón para volver a Home */}
        {cart.length === 0 ? (
          <div className="cart-empty">
            <p className="cart-warning">Your cart is empty</p>
            <Link to="/">
              <ButtonG tipo="btn-return">Back to top</ButtonG>
            </Link>
          </div>
        ) : (
          <>
            {/* 🔹 Listado de productos dentro del carrito */}
            <ul className="cart-list">
              {cart.map((prod) => (
                <li key={prod.id} className="cart-item">

                  {/* Imagen del producto */}
                  <img src={prod.image} alt={prod.name} className="cart-img" />

                  {/* Información y acciones del producto */}
                  <div className="cart-info">
                    <h3 className="cart-name">{prod.name}</h3>
                    <p className="cart-price">Price: ${prod.price}</p>
                    <p className="cart-count">Cantidad: {prod.quantity}</p>

                    {/* Subtotal calculado por producto */}
                    <p className="cart-total-count">
                      Sub Total: {prod.price * prod.quantity}
                    </p>

                    {/* Botón para eliminar solo este producto */}
                    <ButtonG
                      tipo="btn-delete"
                      onClick={() => deleteItem(prod.id)}
                    >
                      Delete
                    </ButtonG>
                  </div>
                </li>
              ))}
            </ul>

            {/* 🔹 Sección final del carrito: total y acciones */}
            <div className="cart-shares">
              <p className="cart-total">
                💰 Total to pay: ${totalQuantityOfItem()}
              </p>

              <div className="cart-buttons">
                
                {/* Finalizar compra */}
                <ButtonG tipo="btn-add" onClick={checkout}>
                  Complete purchase
                </ButtonG>

                {/* Vaciar carrito */}
                <ButtonG tipo="btn-delete" onClick={emptyCart}>
                  Empty cart
                </ButtonG>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
