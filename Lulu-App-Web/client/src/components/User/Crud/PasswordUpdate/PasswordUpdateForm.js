import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import PasswordStrengthBar from 'react-password-strength-bar';


const PasswordUpdateForm = ({ updatePassword, error }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm();

  const onSubmit = (data) => {
    updatePassword(data);
  };


  return (
    <div className="profile-update-container" style={{ height: '100vh' }}>
      <ToastContainer className='toast-container-style' />
      <div className="profile-update-form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="profile-update-form">
          <div className="profile-update-form-group">
            <label htmlFor="password_one">Contraseña</label>
            <input
              style={{ borderColor: error?.message?.length > 0 || errors.oldPassword?.type.length > 0 ? 'red' : '#e81cff'}}
              placeholder="Ingresa tu contraseña actual"
              id="password_one"
              type="password"
              {...register("oldPassword", {
                required: true,
              })}
            />
          </div>
          { error.message ? <p className='message-error' >{error?.message}</p> : null }
          {errors.oldPassword?.type === "required" && ( <p className="message-error">Debes ingresar tu contraseña</p>)}
           <div className="profile-update-form-group">
            <label htmlFor="password-two">Nueva contraseña</label>
            <input
              style={{ borderColor: error?.message?.length > 0 || errors.newPassword?.type.length > 0 ? 'red' : '#e81cff'}}
              placeholder="Ingresa tu nueva contraseña actual"
              id="password-two"
              type="password"
              {...register("newPassword", {
                required: true,
              })}
            />
          </div>
          { watch('newPassword')?.length > 0 && (
                <PasswordStrengthBar
                style={{ padding: '10px'}}
                  password={watch('newPassword')}
                  scoreWords={['Débil', 'Aceptable', 'Fuerte', 'Muy fuerte', 'Segura']}
                  barColors={['white', 'red', '#d69304', 'violet', '#c330ff']}
                  shortScoreWord=''
                  scoreWordStyle={{color: 'white', fontFamily: 'Poppins', fontSize: '10px'}}
                />
            )}
          {errors.newPassword?.type === "required" && ( <p className="message-error">Debes ingresar tu nueva contraseña</p>)}
          <button type="submit" className="profile-update-button-container">
            <span>Continuar</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordUpdateForm;
