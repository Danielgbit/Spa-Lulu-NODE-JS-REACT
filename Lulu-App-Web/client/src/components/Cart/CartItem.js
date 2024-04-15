import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { formatNumber } from "../../utils/numberFormat";


const CartItem = () => {

  const { sendDestroyItem,updateItemQuantity, cartData } = useContext(CartContext);
  const [ items, setItems ] = useState([] || null);

  useEffect(() => {
    setItems(cartData?.cartItems);
  }, [cartData?.cartItems, cartData]);

  useEffect(() => {
    setItems(cartData?.cartItems);
  }, []);


  const onClickDestroyProduct = async (itemId) => {
    sendDestroyItem(itemId);
  };

  const onClickUpdateQuantity = async (action, itemId) => {
      updateItemQuantity(action, itemId);
  };


  return (
    <>
      { items?.map((item) => {

          const totalPrice = formatNumber(item.price * item.quantity);
          let totalPriceWithDiscount = totalPrice;

          if (item.discount > 0) {
            totalPriceWithDiscount = formatNumber((item.price - (item.price * (item.discount / 100))) * item.quantity);
          }

        return (
          <article key={item.productId} className="cart-card-container-max">
            <img src={item.image} alt="" />
            <div className="cart-card-container-content-div">
              <p className="cart-card-title"> {item.productName} </p>{" "}
              <div className="titleAndQuantity-wrapper">
                <p className="cart-card-title cart-stock" > STOCK: {item.stock} </p>{" "}
                <div className="cart-card-container-icons-i-d">
                  {item.stock > 0 && (
                    <i onClick={() => onClickUpdateQuantity("increment", item.itemId)} className="fa-solid fa-plus"></i>
                  )}
                      <p> {item.quantity} </p>
                  {item.quantity > 1 && (
                    <i onClick={() => onClickUpdateQuantity("decrement", item.itemId)} className="fa-solid fa-minus"></i>
                  )}
                </div>
              </div>
              <div className="cart-card-container-price-section">
                <span className="cart-card-price-numbers">{totalPriceWithDiscount}
                </span>
                { item.discount > 0 && <span className="cart-card-discount">{item.discount} % -</span> }
              </div>
              <div className="cart-card-container-trash-section">
                <i onClick={() => onClickDestroyProduct(item.itemId)} class="fa-solid fa-trash"> </i>
              </div>
              <p> 
              </p>
            </div>
          </article>

        )
      })}
    </>
  );
};

export default CartItem;
