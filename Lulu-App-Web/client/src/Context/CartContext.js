import React, { useContext, useState, useEffect } from "react";
import { getCartDetail, postAddCart, sendDestroyProduct, putUpdateItem } from '../services/CartService';
import { UserContext } from './UserContext';


export const CartContext = React.createContext({});

export default function CartProvider({ children }) {
  //Context
  const { userData: user } = useContext(UserContext);

  //UseState
  const [ cartData, setCartData ] = useState([] || null);
  const [ quantityCartItems, setQuantityCartItems ] = useState(null);
  const [ isLoadingCart, setIsLoadingCart ] = useState(true);
  const [ message, setMessage ] = useState('');

  const userId = user?.id;

  const loadCart = async () => {
    if (userId?.toString().length > 0) {
        const res = await getCartDetail(userId);
        if (res?.status === 200) { setCartData(res.data.cartDetail);};
        setIsLoadingCart(false);
    }else {
        setIsLoadingCart(true);
    };
  };

  const addProductInCart = async (productId, stock) => {
    if (userId?.toString().length > 0) {
      const res = await postAddCart(productId, userId,  stock);
      if(res?.status === 201 ) { loadCart(); setMessage('Producto agregado al carrito')};
    };
  }; 

  const sendDestroyItem = async (itemId) => {
    if (itemId.toString().length > 0) {
        const res = await sendDestroyProduct(itemId);
        if(res?.status === 200 ) { loadCart(); };
    };
  };

  const updateItemQuantity = async (action, itemId) => {
    if (itemId.toString().length > 0 && userId.toString().length > 0) {
      const res = await putUpdateItem(action, itemId, userId);
      if(res?.status === 200){ loadCart(); };
    };
  };

  
  return (
    <CartContext.Provider
      value={{
        addProductInCart,
        sendDestroyItem,
        updateItemQuantity,
        setQuantityCartItems,
        loadCart,

        message,
        setMessage,

        userId,
        cartData,
        isLoadingCart,
        quantityCartItems
      }}
    >
      {children}{" "}
    </CartContext.Provider>
  );
}
