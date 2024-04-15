import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { formatNumber } from '../../../../../utils/numberFormat'

const GainUpdateForm = ({ employees, updateGain, gain }) => {

    const { register, formState: {errors}, handleSubmit, setValue } = useForm();

    const onSubmit = (data) => {
        updateGain({ ...data, amount: data.amount.toString().replace(/[$.,]/g, '') });
    };

    useEffect(() => {
        setValue('employeeId', gain.employeeId);
        setValue('dateTime', gain.dateTime);
        setValue('amount', formatNumber(gain.amount));
        setValue('type', gain.type);
        setValue('category', gain.category);
        setValue('description', gain.description);
    }, [gain]);

  return (
    <div className='reusable-form-body'>
        <h1 className='reusable-form-title' >Creacion de ingresos</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="reusable-form-container">
            <div className="reusable-crud-form-text-input-wrapper">
                <select className="textInput" style={{ fontSize: '10px', fontFamily: 'Poppins' }} {...register('employeeId', {
                    required: true,
                    maxLength: 5,
                    minLength: 1
                })}>
                    <option value="">Selecciona un empleado</option>
                    { employees?.map((employee, i) => (
                        <option key={i} value={employee.employeeId}>{employee.fullName}</option>
                    ))}
                </select>
            </div>
                { errors.employeeId?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debes seleccionar un empleado</p> }
                { errors.employeeId?.type === 'maxLength' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Maximo permitido 5 caracteres</p> }
                { errors.employeeId?.type === 'minLength' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debes ingresar almenos 1 cararacteres</p> }
            <div className="reusable-crud-form-text-input-wrapper">
                <input type='date' style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} className="textInput" {...register('dateTime', {
                    required: true,
                    valueAsDate: true,
                })} />
            </div>
                { errors.dateTime?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >La fecha es requerida</p> }
                { errors.dateTime?.type === 'valueAsDate' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debe ser un formato de fecha</p> }
            <div className="reusable-crud-form-text-input-wrapper">
                <input type='text' placeholder='$ Ingresa el monto' className="textInput" style={{ fontSize: '10px', fontFamily: 'Poppins' }} {...register('amount', {
                    required: true,
                    pattern: /^\$?\s?(\d{1,3}(\.\d{3})*|\d+)(,\d{1,2})?$/
                })} />
            </div>
                { errors.amount?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debes suminstrar el monto</p> }
                { errors.amount?.type === 'pattern' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >El monto debe ser un valor numerico</p> }
            <div className="reusable-crud-form-text-input-wrapper">
                    <select className="textInput" style={{ fontSize: '11px', fontFamily: 'Poppins' }} {...register('type', {
                        required: true,
                    })} >
                    <option value="">Selecciona tipo de pago</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta de credito</option>
                    <option value="transferencia">Transferencia bancaria</option>
                </select>
            </div>
            { errors.type?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debes seleccionar el tipo de pago</p> }
            <div className="reusable-crud-form-text-input-wrapper">
                    <select className="textInput" style={{ fontSize: '11px', fontFamily: 'Poppins' }} {...register('category', {
                        required: true,
                    })} >
                    <option value="">Selecciona una categoria</option>
                    <option value="Servicio">Servicio</option>
                    <option value="Producto">Producto</option>
                    <option value="Comision">Comision</option>
                    <option value="Propina">Propina</option>
                </select>
            </div>
            { errors.category?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debes seleccionar una categoria</p> }
            <div className="reusable-crud-form-text-input-wrapper">
                <textarea type='text' style={{ fontSize: '11px', fontFamily: 'Poppins' }} placeholder='Ingresa una descripción' className="textInput" {...register('description', {
                    maxLength: 200
                })} />
            </div>
            { errors.description?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Suministra alguna descripcion del ingreso</p> }
            { errors.description?.type === 'maxLength' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Solo se permiten 200 caracteres</p> }
            <button className="reusable-form-button">
                <span className="reusable-form-button-content">Guardar</span>
              </button>
        </form>
    </div>
  )
}

export default GainUpdateForm
