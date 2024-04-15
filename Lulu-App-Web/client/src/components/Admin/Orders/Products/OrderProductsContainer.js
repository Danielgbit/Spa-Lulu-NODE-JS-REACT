import { useParams } from "react-router-dom"
import OrderProductsDetail from "./OrderProductsDetail"
import { getOrderProducts } from "../../../../services/OrderService"
import { useEffect, useState } from "react";

const OrderProductsContainer = () => {

    const { id } = useParams();
    const [ products, setProduct ] = useState([] || null);

    const loadProductsOrder = async (id) => {
        const res = await getOrderProducts(id);
        if (res?.status === 200) { setProduct(res.data.orderProducts); };
    };

    useEffect(() => {
        if (id.toString().length > 0) {
            loadProductsOrder(id);
        };
    }, []);

  return (
    <OrderProductsDetail products={products} />
  )
}

export default OrderProductsContainer