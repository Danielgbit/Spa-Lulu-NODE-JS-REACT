import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

const AdminFormLogin = ({ errors: e, handleOnSubmit, unautorized, isAutorized }) => {

  const { register, formState: { errors }, handleSubmit } = useForm();

  
    const [showPassword, setShowPassword] = useState(false);
  
    const onClickShowPassword = (booleean) => {
      setShowPassword(booleean);
    };


  const navigate = useNavigate();

  const OnSubmit = (data) => {
    handleOnSubmit(data);
  };

  
  useEffect(() => {
    if (isAutorized === true) {
      navigate('/admin');
    }
  }, [isAutorized]);


  return (
      <div className='login-body'>
            <div className='login-image-container'>
                <img src="/img/login/Login-ilustration.svg" alt=""/> 
            </div>
            <form onSubmit={handleSubmit(OnSubmit)} className="login-card-form-container">
                <h1>Administrador</h1>
                {unautorized?.length > 0 && <p className='message-error'>{unautorized}</p>} 
                <div className='login-inputs-wrapper'>
                    <div className="login-InputContainer">
                        <input className='login-input' style={{ border: errors.email?.type.length > 0 || e?.email?.length > 0 || unautorized?.length > 0 ? '2px solid #ff00a6' : null }} placeholder="Ingresa tu correo" id="input"  name="text" type="email" {...register('email', {
                            required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, maxLength: 100
                        })} />  
                    </div>
                        {e?.map((e, i) => ( <p style={{ color: 'white', background: 'red' }} key={i}>{e.email}</p> ))}
                        {errors.email?.type === 'required' && <span className='message-error'>Debes ingresar un email</span> }
                        {errors.email?.type === 'pattern' && <span className='message-error'>Debes ingresar un email valido</span> }
                        {errors.email?.type === 'maxLength' && <span className='message-error'>Solo se permiten 100 caracteres</span> }
                    <div className="login-InputContainer">
                        <input className='login-input' style={{ border: errors.password?.type.length > 0 || e?.password?.length > 0 || unautorized?.length > 0  ? '2px solid #ff00a6' : null }} placeholder="Ingresa tu contraseña" id="input"  name="text" type={ showPassword ? 'text' : 'password' } {...register('password', {
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
            </form>
        </div>
  );
};

export default AdminFormLogin;
