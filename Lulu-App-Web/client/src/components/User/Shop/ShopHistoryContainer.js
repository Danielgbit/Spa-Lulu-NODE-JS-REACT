import { useEffect, useState } from "react";
import ShopHistoryList from "./ShopHistoryList";
import { getShoppingHistory } from "../../../services/UserService";
import { useParams } from "react-router-dom";


const ShopHistoryContainer = () => {
    const { id } = useParams();

    const [ shoppings, setShoppings ] = useState([] || null);

    const loadShoppingHistories = async () => {
      if (id?.toString().length > 0) {
        const res = await getShoppingHistory(id);
        if(res.status === 200) { setShoppings(res.data.shoppings) };
      }
    };

    useEffect(() => {
        loadShoppingHistories();
    }, [id]);


  return (
    <ShopHistoryList shoppings={shoppings}/>
  )
}

export default ShopHistoryContainer
