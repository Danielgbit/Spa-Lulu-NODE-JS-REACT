import InventoryAdmin from './InventoryAdmin'
import { getAllItems, destroyItem } from '../../../services/InventoryService';
import { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';


const InventoryAdminContainer = () => {

    const [ items, setItems] = useState([] || null);
    const [ isLoading, setIsLoading] = useState(true);


    const loadItems = async () => {
        const res = await getAllItems();
        if (res?.status === 200) { setItems(res.data.inventoryItems) }
        setIsLoading(false);
    };

    const deleteItem = async (id) => {
      const res = await destroyItem(id);
      if(res?.status === 200) loadItems();
      if(res?.status === 404) { console.error(res.data.message); }
    };

    useEffect(() => {
        loadItems();
    }, []);


  return (
    <>
      {isLoading ? (
        <div className='spinner-container'>
            <Spinner
              thickness='4px'
              speed='350ms'
              emptyColor='gray.200'
              color='violet.200'
              size='xl'
            />
        </div>
      ) : (
        <InventoryAdmin
            items={items}
            isLoading={isLoading}
            deleteItem={deleteItem}
        />
      )}
    </>
  )
}

export default InventoryAdminContainer
