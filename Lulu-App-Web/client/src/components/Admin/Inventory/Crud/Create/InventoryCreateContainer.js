import React from 'react'
import InventoryCreateForm from './InventoryCreateForm'
import { postCreateInventory } from '../../../../../services/InventoryService';
import { useNavigate } from 'react-router-dom';


const InventoryCreateContainer = () => {

  const navigate = useNavigate();

  const createInventoryItem = async (data) => {
    const res = await postCreateInventory(data);
    if(res.status === 201) navigate('/admin/inventory');
    if(res.status === 400) {console.error(res.data.message);}
  };

  return (
    <InventoryCreateForm
      createInventoryItem={createInventoryItem}
    />
  )
}

export default InventoryCreateContainer
