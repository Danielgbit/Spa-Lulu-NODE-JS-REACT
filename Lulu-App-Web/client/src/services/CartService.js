import axios from "axios";

const host = 'http://localhost:4000';

export async function getCartDetail (userId) {
    try {
      const res = await axios.get(`${host}/cart/detail/${userId}`);
      return res;
    } catch (e) {
        console.error({ message: e.message });
    };
  };


export async function postAddCart(productId, userId, stock, quantity) {
    try {
        const url = `${host}/cart/add/${userId}`;
        const res = await axios.post(url, { productId: productId, stock: stock, quantity: quantity });
        return res;
    } catch (e) {
        console.error(e);
        return e.response;
    }
};



export async function sendDestroyProduct (itemId) {
    try {
      const url = `http://localhost:4000/cart/destroyProductInCart/${itemId}`;
      const response = await axios.delete(url);
      return response;
    } catch (e) {
      console.error(e);
    };
};


export const putUpdateItem = async (action, itemId, userId,) => {
    try {
      const url = `http://localhost:4000/cart/updateItemCart/${itemId}`;
      const response = await axios.put(url, { action: action, userId: userId });
      return response;
    } catch (error) {
      console.error({ error: error.request, status: error.status });
    }
}; 