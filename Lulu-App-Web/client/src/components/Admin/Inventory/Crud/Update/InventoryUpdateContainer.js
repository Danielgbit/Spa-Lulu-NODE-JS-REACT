import { useNavigate, useParams } from 'react-router-dom';
import InventoryUpdateForm from './InventoryUpdateForm'
import { getItem, putInventoryItem } from '../../../../../services/InventoryService'
import { useEffect, useState } from 'react';
import { Spinner} from '@chakra-ui/react';

const InventoryUpdateContainer = () => {

  const { id } = useParams();
  const [ item, setItem ] = useState([] || null);
  const [ isLoading, setIsLoading ] = useState(true);
  const navigate = useNavigate();

  const loadInventoryItem = async (id) => {
    const res = await getItem(id);
    if(res.status === 200) { setItem(res.data.inventoryItemDetail) };
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      loadInventoryItem(id);
    };
  }, []);


  const updateInventaryItem = async (body) => {
    if (id) {
      const res = await putInventoryItem(id, body);
      if(res.status === 200) { navigate('/admin/inventory') }
      if(res.status === 400) { console.error(res.data.message); }
      if(res.status === 404) { console.error(res.data.message); }
    };
  };

  return (
    <>
      {isLoading ? ( <Spinner/> ) : ( 
        <InventoryUpdateForm
          updateInventaryItem={updateInventaryItem}
          item={item}
        />
      )}
    </>
  )
}

export default InventoryUpdateContainer