import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { formatNumber } from '../../../../../utils/numberFormat'


const ExpenseUpdateForm = ({ updateExpense, expense }) => {

  const { register, formState: {errors}, handleSubmit, setValue } = useForm();

  useEffect(() => {
     setValue('paymentMethod', expense.paymentMethod);
     setValue('description', expense.description);
     setValue('category', expense.category);
     setValue('dateTime', expense.dateTime);
     setValue('quantity', formatNumber(expense.quantity)); 
  }, [expense]);

  const onSubmit = (data) => {
      updateExpense({ ...data,
          quantity: data.quantity.toString().replace(/[$.,]/g, '')
      });
  };

  return (
        <div className='reusable-form-body' >
        <h1 className='reusable-form-title' >actualización de gastos</h1>
            <form className="reusable-form-container" onSubmit={handleSubmit(onSubmit)} >
            <div className="reusable-crud-form-text-input-wrapper" >
                <select className="textInput" style={{ fontSize: '10px', fontFamily: 'Poppins' }} {...register('paymentMethod', {
                    required: true,
                })} >
                    <option value="">Selecciona el metodo de pago</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta de credito</option>
                    <option value="transaccion">Transacción bancaria</option>
                </select>
            </div>
                { errors.paymentMethod?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debes seleccionar el metodo de pago</p> }
            <div className="reusable-crud-form-text-input-wrapper" >
                <select className="textInput" style={{ fontSize: '10px', fontFamily: 'Poppins' }} {...register('category', {
                    required: true,
                })} >
                    <option value="">Selecciona una categoria</option>
                    <option value="insumos">Insumos</option>
                    <option value="reparacion">Reparación</option>
                    <option value="factura">Factura</option>
                    <option value="devolucion">Devolución</option>
                    <option value="servicio">Servicio</option>
                    <option value="producto">Producto</option>
                    <option value="comision">Comision</option>
                    <option value="propina">Propina</option>
                </select>
            </div>
                { errors.category?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debes seleccionar una categoria</p> }
            <div className="reusable-crud-form-text-input-wrapper" >
                <input type='date' className="textInput" style={{ fontSize: '10px', fontFamily: 'Poppins' }} {...register('dateTime', {
                    required: true,
                    valueAsDate: true
                })} />
            </div>
                { errors.dateTime?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debes suminstrar la fecha</p> }
                { errors.dateTime?.type === 'valueAsDate' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debe ser una valor de fecha permitido</p> }
            <div className="reusable-crud-form-text-input-wrapper" >
                <textarea placeholder='Ingresa una descripción' className="textInput" style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} {...register('description', {
                    required: true,
                    maxLength: 200,
                })} />
            </div>
                { errors.description?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debes suministrar una descripción</p> }
                { errors.description?.type === 'maxLength' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Solo se permiten 200 caracteres</p> }
            <div className="reusable-crud-form-text-input-wrapper" >
                <input type='text' placeholder='$ Ingresa el monto' className="textInput" style={{ fontSize: '10px', fontFamily: 'Poppins' }} {...register('quantity', {
                    required: true,
                    pattern: /^\$?\s?(\d{1,3}(\.\d{3})*|\d+)(,\d{1,2})?$/
                })} />
            </div>
                { errors.quantity?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debes suminstrar el monto</p> }
                { errors.quantity?.type === 'pattern' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >El monto debe ser un valor numerico</p> }
                <button className="reusable-form-button">
                  <span className="reusable-form-button-content">Guardar</span>
              </button>
        </form>
    </div>
  )
}

export default ExpenseUpdateForm