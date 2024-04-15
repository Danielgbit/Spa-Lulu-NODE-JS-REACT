import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utils/numberFormat";
import NotEmpty from "../NotEmpty/NotEmpty";

const Cart = ({ cartData, totalPrice, onClickConfirmOrder }) => {
  const _onClickConfirmOrder = async () => {
    onClickConfirmOrder();
  };

  return (
    <>
      {cartData?.lengthItems === 0 ? (
        <NotEmpty
          image="/img/notEmpty/notEmpty-cart.svg"
          message="¡Ups! Actualmente no tienes productos agregados en el carrito"
          redirect="/products"
          redirectMessage="Volver a productos"
        />
      ) : (
        <div className="cart-page-container-cards-articles">
          <CartItem />
          <div className="cart-page-container-button-confirm">
            <div className="cart-total-container">
              <span className="cart-total-text">TOTAL: </span>
              <span className="cart-total-price">
                {formatNumber(totalPrice)}
              </span>
            </div>
            <button onClick={_onClickConfirmOrder} className="cart-button-checkout">
                <i class="fa-regular fa-credit-card"></i>
              <span>CONTINUAR </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
