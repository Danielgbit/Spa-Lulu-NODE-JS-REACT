import { useParams } from "react-router-dom";
import OrderDetail from "./OrderDetail";
import { getOrderDetail } from '../../../../services/OrderService';
import { useEffect, useState } from "react";

export const OrderDetailContainer = () => {

    const { id } = useParams();
    const [ order, setOrder ] = useState([] || null);

    const loadOrderDetail = async (id) => {
        const res = await getOrderDetail(id);
        if (res?.status === 200) { setOrder(res.data.orderDetail); };
    };

    useEffect(() => {
        if (id.toString().length > 0) {
            loadOrderDetail(id);
        };
    }, [id]);


  return (
    <OrderDetail order={order} />
  )
}
