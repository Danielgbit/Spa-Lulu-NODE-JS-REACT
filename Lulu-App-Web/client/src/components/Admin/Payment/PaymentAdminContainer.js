import PaymentAdmin from "./PaymentAdmin"
import { getPayments } from "../../../services/PaymentService"
import { useEffect, useState } from "react";

const PaymentAdminContainer = () => {

  const [ payments, setPayments ] = useState([] || null);

  const loadPayments = async () => {
    const res = await getPayments();
    if(res?.status === 200) { setPayments(res.data.payments); };
  };

  useEffect(() => {
    loadPayments();
  }, []);


  return (
    <PaymentAdmin
      payments={payments}
    />
  ) 
}

export default PaymentAdminContainer