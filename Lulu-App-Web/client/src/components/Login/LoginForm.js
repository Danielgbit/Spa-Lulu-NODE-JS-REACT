import { Link } from 'react-router-dom';
import { useState } from "react";
import { useForm } from 'react-hook-form';


const LoginForm = ({ handleDataForm, errors: e, isIncorrectUser }) => {

    const [showPassword, setShowPassword] = useState(false);
  
    const onClickShowPassword = (booleean) => {
      setShowPassword(booleean);
    };

    const { register, handleSubmit, formState: {errors} } = useForm();
    
    const onSubmit = (data) => {
        handleDataForm(data);
    };
    

    return(
        <div className='login-body'>
            <div className='login-info-wrapper'>
                <div className='login-info-title-container'>
                    <h2>¡Hola! Para agregar al carrito ingresa tu email y contraseña o crea una cuenta!</h2>
                </div>
                <div className='login-image-container'>
                    <img src="/img/login/Login-ilustration.svg" alt=""/> 
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="login-card-form-container">
                <h1>Ingreso</h1>
                {isIncorrectUser?.length > 0 &&  <p className='message-error' >{isIncorrectUser}</p> }   
                <div className='login-inputs-wrapper'>
                    <div className="login-InputContainer">
                        <input className='login-input' style={{ border: errors.email?.type.length > 0 || e?.email?.length > 0 || isIncorrectUser?.length > 0 ? '2px solid #ff00a6' : null }} placeholder="Ingresa tu correo" id="input"  name="text" type="email" {...register('email', {
                            required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, maxLength: 100
                        })} />  
                    </div>
                        {e?.map((e, i) => ( <p style={{ color: 'white', background: 'red' }} key={i}>{e.email}</p> ))}
                        {errors.email?.type === 'required' && <span className='message-error'>Debes ingresar un email</span> }
                        {errors.email?.type === 'pattern' && <span className='message-error'>Debes ingresar un email valido</span> }
                        {errors.email?.type === 'maxLength' && <span className='message-error'>Solo se permiten 100 caracteres</span> }
                    <div className="login-InputContainer">
                        <input className='login-input' style={{ border: errors.password?.type.length > 0 || e?.password?.length > 0 || isIncorrectUser?.length > 0  ? '2px solid #ff00a6' : null }} placeholder="Ingresa tu contraseña" id="input"  name="text" type={ showPassword ? 'text' : 'password' } {...register('password', {
                            required: true, maxLength: 200
                        })}/>
                        <div className='password-icons-container-show' style={{ padding: '0 4px' }}>
                            { showPassword ? (
                                <i  onClick={() => onClickShowPassword(false)} className="fa-solid fa-eye-slash"></i>
                            ) : (
                                <i  onClick={() => onClickShowPassword(true)} className="fa-solid fa-eye"></i>
                            )}
                        </div>
                    </div>
                    {e?.map((e, i) => ( <p style={{ color: 'white', background: 'red' }} key={i}>{e.password}</p> ))}
                    {errors.password?.type === 'required' && <span className='message-error'>Debes ingresar la contraseña</span> }
                    {errors.password?.type === 'maxLength' && <span className='message-error'>Solo se permiten 200 caracteres</span> }

                </div>
                <button className="button">
                    <i class="fa-solid fa-arrow-right"></i>
                    <div className="text">Ingresar</div>
                </button>
                <div className="login-form-container-redirect">
                    <i className="fa-regular fa-user"></i>
                    <Link to={'/register'}>¿Aun no tienes una cuenta?</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;