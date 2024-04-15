import { DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";

const ClientForm = ({ createClient, errors }) => {

  const { register, formState: { errors: err }, handleSubmit, control } = useForm();


  const handleOnSubmit = (data) => {
    createClient({...data, birthDate: data.birthDate.$d});
  };


  return (
    <div className="reusable-form-body">
      <h1 className="reusable-form-title">Creación de cliente</h1>
      <form className="reusable-form-container" onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="reusable-crud-form-text-input-wrapper">
          <input
            placeholder="Ingresa el primer nombre"
            className="textInput"
            type="text"
            { ...register('firstName', {
              required: { value: true, message: 'Debes ingresar un nombre' },
              maxLength: { value: 30, message: 'El nombre no debe exceder 30 caracteres' },
              pattern: { value: /^[a-zA-Z\s]+$/, message: 'El nombre solo debe contener letras y espacios en blanco',
              },
            })}
          />
        </div>
        {errors?.map((e) => e.firstName &&  <p className="message-error">{e.firstName}</p> )}
        { err.firstName?.message && <p className="message-error">{err.firstName.message}</p> }

        <div className="reusable-crud-form-text-input-wrapper">
          <input
            className="textInput"
            placeholder="Ingresa el segundo nombre"
            {...register('middleName', {
              maxLength: { value: 30, message: 'El segundo nombre no debe exceder 30 caracteres' },
              pattern: { value: /^[a-zA-Z\s]+$/, message: 'El segundo nombre solo debe contener letras y espacios en blanco'},
            })}
            type="text"
          />
        </div>
        {errors?.map(
          (error) =>
            error.middleName && (
              <p className="message-error">{error.middleName}</p>
            )
        )}
        { err.middleName?.message && <p className="message-error">{err.middleName.message}</p> }


        <div className="reusable-crud-form-text-input-wrapper">
          <input
            placeholder="Ingresa el apellido"
            className="textInput"
            type="text"
            { ...register('lastName', {
              required: { value: true, message: 'Debes ingresar un apellido' },
              maxLength: { value: 30, message: 'El apellido no debe exceder 30 caracteres' },
              pattern: { value: /^[a-zA-Z\s]+$/, message: 'El apellido solo debe contener letras y espacios en blanco'},
            })}
          />
        </div>
        {errors?.map(
          (error) =>
            error.lastName && <p className="message-error">{error.lastName}</p>
        )}
        { err.lastName?.message && <p className="message-error">{err.lastName.message}</p> }

        <div className="reusable-crud-form-text-input-wrapper">
          <input
            placeholder="Ingresa el numero de telefono"
            className="textInput"
            type="number"
            { ...register('phoneNumber', {
              maxLength: { value: 20, message: 'El numero de telofono no debe exceder los 20 caracteres' },
              valueAsNumber: { value: true, message: 'Debes ingresar un valor numerico' },
            })}
          />
        </div>
        {errors?.map(
          (error) =>
            error.phoneNumber && (
              <p className="message-error">{error.phoneNumber}</p>
            )
        )}
        { err.phoneNumber?.message && <p className="message-error">{err.phoneNumber.message}</p> }


        <div className="reusable-crud-form-text-input-wrapper">
          <input
            placeholder="Ingresa el email @"
            className="textInput"
            type="email"
            {...register('email')}
          />
        </div>
        {errors?.map(
          (error) =>
            error.email && <p className="message-error">{error.email}</p>
        )}

        <div className="reusable-crud-form-text-input-wrapper">
          <Controller
              name="birthDate"
              control={control}
              rules={{ required: true }} 
              render={({ field }) => (
                <DatePicker
                  className="custom-datePicker"
                  {...field}
                  placeholder="Fecha de nacimiento"
                  format="YYYY-MM-DD"
                  size="9"
                />
              )}
            />
        </div>
        { err.birthDate?.type === 'required' && <p className="message-error">Debes ingresar la fecha de nacimiento</p> }
        <button className="reusable-form-button">
          <span className="reusable-form-button-content">Guardar</span>
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
