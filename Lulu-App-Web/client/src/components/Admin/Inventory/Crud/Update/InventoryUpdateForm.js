import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { formatNumber } from '../../../../../utils/numberFormat'

const InventoryUpdateForm = ({ updateInventaryItem, item }) => {

  const { register, formState: {errors}, handleSubmit, setValue } = useForm();

  useEffect(() => {
    setValue('name', item.name); 
    setValue('quantity', item.quantity); 
    setValue('supplier', item.supplier); 
    setValue('expirationDate', item.expirationDate); 
    setValue('category', item.category); 
    setValue('description', item.description); 
    setValue('price', item.price); 
    setValue('salePrice', item.salePrice); 
  }, [item]);

  const onSubmit = (data) => {
    updateInventaryItem({ ...data, price: data.price.toString().replace(/[$.,]/g, ''), salePrice: data.salePrice.toString().replace(/[$.,]/g, '') });
  };

  return (
    <div className='reusable-form-body'>
    <h1 className='reusable-form-title'>Actualización de inventario</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="reusable-form-container">
          <div className="reusable-crud-form-text-input-wrapper">
              <input placeholder="Ingresa el nombre" type="text"  className="textInput" {...register('name', {
                required: true,
                maxLength: 50,
                minLength: 5
              })} />
          </div>
              { errors.name?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >El campo nombre es requerido</p> }
              { errors.name?.type === 'maxLength' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Maximo permitido 50 caracteres</p> }
              { errors.name?.type === 'minLength' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debes ingresar almenos 5 cararacteres</p> }
          <div className="reusable-crud-form-text-input-wrapper">
              <input placeholder="Cantidad" type='number'   className="textInput" {...register('quantity', {
                required: true,
                valueAsNumber: true,
                maxLength: 3,
                minLength: 1
              })} />
          </div>
              { errors.quantity?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >La cantidad es requerida</p> }
              { errors.quantity?.type === 'valueAsNumber' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Solo se permiten valores numericos</p> }
              { errors.quantity?.type === 'maxLength' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Maximo permitido 3 caracteres</p> }
              { errors.quantity?.type === 'minLength' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Minimo permitido 1 caracteres</p> }
          <div className="reusable-crud-form-text-input-wrapper">
              <input placeholder="Proveedor" type="text"  className="textInput" {...register('supplier', {
                maxLength: 50
              })} />
          </div>
              { errors.supplier?.type === 'maxLength' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Maximo permitido 50 caracteres</p> }
          <div className="reusable-crud-form-text-input-wrapper">
              <input placeholder="Fecha de vencimiento" type="date"  className="textInput" {...register('expirationDate', {
                valueAsDate: true,
                required: true,
              })} />
          </div>
          { errors.expirationDate?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debes suministrar un formato de fecha</p> }
          { errors.expirationDate?.type === 'valueAsDate' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debes suministrar un formato de fecha disponible</p> }
          <div className="reusable-crud-form-text-input-wrapper">
              <select className="textInput" name="" id="" {...register('category', {
                required: true,
                maxLength: 100,
                minLength: 2
              })}>
                  <option  value="Maquillaje">Maquillaje</option>
                  <option  value="Terapias">Terapias</option>
                  <option  value="Barberia">Barberia</option>
                  <option  value="Uñas">Manicure-pedicure</option>
                  <option  value="Alisados">Alisados</option>
              </select>
          </div>
          { errors.category?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >La categoria es obligatoria</p> }
          { errors.category?.type === 'maxLength' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Maximo 100 caracteres permitidos</p> }
          { errors.category?.type === 'minLength' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Suministra minimo 2 caracteres</p> }
          <div className="reusable-crud-form-text-input-wrapper">
              <textarea className='input-textArea'   placeholder="Ingresa una descripción" type="text"  {...register('description', {
                maxLength: 200,
              })} />
          </div>
          { errors.description?.type === 'maxLength' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Maximo 200 caracteres permitidos</p> }
              <div className="reusable-crud-form-text-input-wrapper">
                  <input placeholder="Ingrese un precio compra" type="text" style={{ fontFamily: 'Poppins', fontSize: '11px' }}  className="textInput" {...register('price', {
                      maxLength: 50,
                      pattern: /^\$?\s?(\d{1,3}(\.\d{3})*|\d+)(,\d{1,2})?$/
                  })} />
              </div>
                  { errors.price?.type === 'maxLength' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Maximo permitido 50 caracteres</p> }
                  { errors.price?.type === 'pattern' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debe ser un valor numerico</p> }

              <div className="reusable-crud-form-text-input-wrapper">
                  <input placeholder="Ingrese un precio de venta" type="text" style={{ fontFamily: 'Poppins', fontSize: '11px' }}  className="textInput" {...register('salePrice', {
                      maxLength: 50,
                      pattern: /^\$?\s?(\d{1,3}(\.\d{3})*|\d+)(,\d{1,2})?$/
                  })} />
              </div>
                  { errors.salePrice?.type === 'maxLength' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Maximo permitido 50 caracteres</p> }
                  { errors.salePrice?.type === 'pattern' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debe ser un valor numerico</p> }

              <button className="reusable-form-button">
                <span className="reusable-form-button-content">Guardar</span>
              </button>
    </form>
    
  </div>
  )
}

export default InventoryUpdateForm