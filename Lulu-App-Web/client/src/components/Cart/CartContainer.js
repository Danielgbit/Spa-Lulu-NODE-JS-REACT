import { useContext, useEffect, useState } from "react";
import Cart from "./Cart";
import { CartContext } from "../../Context/CartContext";
import { Spinner } from "@chakra-ui/react";
import { orderCreate } from '../../services/OrderService';

const CartContainer = () => {
  const { cartData, isLoadingCart, loadCart } = useContext(CartContext);
  const [ totalPrice, setTotalPrice ] = useState(0);
  const [ confirm, setConfirm ] = useState(false);
  const [ checkoutUrl, setCheckoutUrl ] = useState('');


  const calculateTotal = () => {
    if (cartData?.cartItems?.length > 0) {
      const total = cartData?.cartItems.reduce((accum, item) => {
        return accum + Number(item?.price) * item?.quantity;
      }, 0);
      setTotalPrice(total);
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [cartData?.cartItems]);

  useEffect(() => {
    loadCart();
  }, []);
  

  const onClickConfirmOrder = async () => {
    const res = await orderCreate({ products: cartData.cartItems, userId: cartData.userId});
    if(res?.status === 200) { setConfirm(true); setCheckoutUrl(`${res?.data}`) };
  };



  useEffect(() => {
    if (confirm) {
      window.location.href = checkoutUrl;
    };
  }, [confirm, setConfirm]);

  return (
    <>
      {isLoadingCart ? (
        <Spinner />
      ) : (
        <Cart cartData={cartData} totalPrice={totalPrice} onClickConfirmOrder={onClickConfirmOrder} />
      )}
    </>
  );
};

export default CartContainer;
