import { useForm } from 'react-hook-form'

const GainCreateForm = ({ createGain, employees }) => {

    const { register, formState: {errors}, handleSubmit } = useForm();

    const onSubmit = (data) => {
        createGain({ ...data, amount: data.amount.toString().replace(/[$.,]/g, '') });
    };


  return (
    <div className='reusable-form-body' style={{ height: '100vh' }} >
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
            <div className="reusable-crud-form-text-input-wrapper" >
                <input type='date' className="textInput" {...register('dateTime', {
                    required: true,
                    valueAsDate: true,
                })} />
            </div>
                { errors.dateTime?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >La fecha es requerida</p> }
                { errors.dateTime?.type === 'valueAsDate' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debe ser un formato de fecha</p> }
            <div className="reusable-crud-form-text-input-wrapper" >
                <input placeholder="Ingrese un monto" type="text" style={{ fontFamily: 'Poppins', fontSize: '11px' }}  className="textInput" {...register('amount', {
                    maxLength: 10,
                    pattern: /^\$?\s?(\d{1,3}(\.\d{3})*|\d+)(,\d{1,2})?$/
                })} />
            </div>
                { errors.amount?.type === 'maxLength' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Maximo permitido 10 caracteres</p> }
                { errors.amount?.type === 'pattern' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debe ser un valor numerico</p> }
            <div className="reusable-crud-form-text-input-wrapper" >
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
            <div className="reusable-crud-form-text-input-wrapper" >
                    <select className="textInput" style={{ fontSize: '11px', fontFamily: 'Poppins' }} {...register('category', {
                        required: true,
                    })} >
                    <option value="">Selecciona una categoria</option>
                    <option value="servicio">Servicio</option>
                    <option value="producto">Producto</option>
                    <option value="comision">Comision</option>
                    <option value="propina">Propina</option>
                </select>
            </div>
            { errors.category?.type === 'required' && <p style={{ color: 'white', fontSize: '10px', fontFamily: 'Poppins' }} >Debes seleccionar una categoria</p> }
            <div className="reusable-crud-form-text-input-wrapper" >
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

export default GainCreateForm