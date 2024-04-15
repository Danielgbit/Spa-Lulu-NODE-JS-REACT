import OrderAdmin from "./OrderAdmin"
import { getOrders } from "../../../services/OrderService"
import { useEffect, useState } from "react";


const OrderAdminContainer = () => {

  const [ orders, setOrders ] = useState([] || null);

  const loadOrders = async () => {
    const res = await getOrders();
    if(res?.status === 200) { setOrders(res.data.orders); };
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <OrderAdmin orders={orders} loadOrders={loadOrders}/>
    
  )
}

export default OrderAdminContainer
