import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller }  from 'react-hook-form';
import { Upload, Radio } from 'antd';
import { UserContext } from "../../Context/UserContext";
import { toast, ToastContainer } from 'react-toastify';
import ImgCrop from 'antd-img-crop';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Spinner } from '@chakra-ui/react';


const RegisterForm = ({ createUser, error, cities, isExisting, errorsExVali, avatarOptions }) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { register, formState: {errors}, handleSubmit, control, watch } = useForm();
  const { messageAuth, setMessageAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const onClickShowPassword = (booleean) => {
    setShowPassword(booleean);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [messageAvatar, setMessageAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value)
    if (watch('avatar')?.length) { 
      setSelectedOption(null); 
      setMessageAvatar('Debes escoger imagen o avatar');
    };
  };
  

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  useEffect(() => {
    if (messageAvatar?.length > 0) {
      const time = setTimeout(() => {
        setMessageAvatar('');
      }, 5000);
      return () => clearTimeout(time); 
    }
  }, [messageAvatar]);

  
  const onSubmit = (data) => {
    if (!watch('avatar')?.length && !selectedOption) {
      return setMessageAvatar('Debes escoger una imagen o avatar');
    }else {
        createUser({
          ...data, 
          avatar: data.avatar?.length > 0 && data.avatar[0].originFileObj, 
          avatarDefault: data.avatar?.length > 0 ? null : selectedOption
        });
    }

  };


  useEffect(() => {
    if (messageAuth.length > 0) {
        toast.success(messageAuth);
        setIsLoading(true);
        const loading = setTimeout(() => {
          navigate('/ingreso');
          setIsLoading(false);
        }, 3000);
        return () => clearTimeout(loading), setMessageAuth('');
      };
  }, [messageAuth]);

  
  if (isLoading) {
    return (
      <div className="spinner-container">
        <ToastContainer  className='toast-container-style'/>
          <Spinner
            thickness="4px"
            speed="350ms"
            emptyColor="gray.200"
            color="violet.200"
            size="xl"
          />
      </div>
    )
  };

  return (
    <div className="register-container">
          <ToastContainer  className='toast-container-style'/>
      <div className="register-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <div className="register-form-group">
              <label htmlFor="firstName">Primer nombre</label>
              <input placeholder="Ingresa tu primer nombre" 
                id="firstName" 
                type="text" 
                style={{ borderColor: error?.message?.length > 0 || errorsExVali?.firstName?.length > 0 || errors.firstName?.type.length > 0 ? 'red' : ''}}
                {...register('firstName', {
                  required: true,
                  pattern: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/,
                  maxLength: 50
              })}/>
          </div>
              { errors.firstName?.type === 'required' && <p className='message-error'>Debes ingresar tu primer nombre</p> }
              { errors.firstName?.type === 'pattern' && <p className='message-error'>Solo se permiten letras</p> }
              { errors.firstName?.type === 'maxLength' && <p className='message-error'>Solo se permiten 50 caracteres</p> }
              { errorsExVali?.map((error) => error.firstName && <p className='message-error'>{error.firstName}</p>) }

          <div className="register-form-group">
              <label htmlFor="firstName">Segundo nombre</label>
              <input placeholder="Ingresa tu segundo nombre" 
                id="firstName" 
                style={{ borderColor: error?.message?.length > 0 || errorsExVali?.middleName?.length > 0 || errors.middleName?.type.length > 0 ? 'red' : ''}}
                type="text" {...register('middleName', {
                  pattern: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/,
                  maxLength: 50
              })}/>
          </div>
              { errors.middleName?.type === 'pattern' && <p className='message-error'>Solo se permiten letras</p> }
              { errors.middleName?.type === 'maxLength' && <p className='message-error'>Solo se permiten 50 caracteres</p> }
              { errorsExVali?.map((error) => error.middleName && <p className='message-error'>{error.middleName}</p>) }

          <div className="register-form-group">
              <label htmlFor="lastName">Apellido</label>
              <input placeholder="Ingresa tu apellido" 
                id="lastName"
                style={{ borderColor: error?.message?.length > 0 || errorsExVali?.lastName?.length > 0 || errors.lastName?.type.length > 0 ? 'red' : ''}}
                type="text" {...register('lastName', {
                  required: true,
                  pattern: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/,
                  maxLength: 50
              })}/>
          </div>
              { errors.lastName?.type === 'required' && <p className='message-error'>Debes ingresar tu apellido</p> }
              { errors.lastName?.type === 'pattern' && <p className='message-error'>Solo se permiten letras</p> }
              { errors.lastName?.type === 'maxLength' && <p className='message-error'>Solo se permiten 50 caracteres</p> }
              { errorsExVali?.map((error) => error.lastName && <p className='message-error'>{error.lastName}</p>) }

          <div className="register-form-group">
              <label htmlFor="phoneNumber">Numero de telefono</label>
              <input placeholder="Ingresa un numero de telefono Ejm: 304523564" 
                id="phoneNumber" 
                style={{ borderColor: error?.message?.length > 0 || errorsExVali?.phoneNumber?.length > 0 || errors.phoneNumber?.type.length > 0 ? 'red' : ''}}
                type='number' {...register('phoneNumber', {
                  required: true,
                  valueAsNumber: true,
                  maxLength: 15
              })}/>
          </div>
              { errors.phoneNumber?.type === 'required' && <p className='message-error'>Debes ingresar un numero de telefono</p> }
              { errors.phoneNumber?.type === 'valueAsNumber' && <p className='message-error'>Debe ser un valor numerico</p> }
              { errors.phoneNumber?.type === 'maxLength' && <p className='message-error'>Solo se permiten 15 caracteres</p> }
              { errorsExVali?.map((error) => error.phoneNumber && <p className='message-error'>{error.phoneNumber}</p>) }
              
          <div className="register-form-group">
              <label htmlFor="email">Correo</label>
              <input placeholder="Ingresa un correo @"
                type="email"
                style={{ borderColor: error?.message?.length > 0 || isExisting?.length > 0 || errorsExVali?.email?.length > 0 || errors.email?.type.length > 0 ? 'red' : ''}}
                id="email" {...register('email', {
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                  maxLength: 100
              })}/>
          </div>
              { errors.email?.type === 'required' && <p className='message-error'>Debes ingresar un correo</p> }
              { errors.email?.type === 'pattern' && <p className='message-error'>Debe ser un formato valido de email</p> }
              { errors.email?.type === 'maxLength' && <p className='message-error'>Solo se permiten 100 caracteres</p> }
              { isExisting?.length > 0 && (<p className='message-error' >{isExisting && isExisting}</p>) }
              { errorsExVali?.map((error) => error.email && (<p className='message-error'>{error.email}</p>)) }
          <div className="register-form-group">
            <label htmlFor="city">Ciudad</label>
            <select 
              style={{backgroundColor: '#82267d', borderColor: error?.message?.length > 0 || errorsExVali?.city?.length > 0 || errors.city?.type.length > 0 ? 'red' : ''}}
              id="city" {...register('city', { required: true,})}>
              <option value="">Selecciona una ciudad</option>
              {cities?.map((city, i) => (<option style={{color: 'white'}} key={i} value={city}>{city}</option>) )}
            </select>
          </div>
              { errors.city?.type === 'required' && <p className='message-error'>Debes seleccionar una ciudad</p> }
              { errorsExVali?.map((error) => error.city && <p className='message-error'>{error.city}</p>) }
              
          <div className="register-form-group">
              <label htmlFor="district">Barrio</label>
              <input placeholder="Ingresa tu zona residencial"
                style={{borderColor: error?.message?.length > 0 || errorsExVali?.district?.length > 0 || errors.district?.type.length > 0 ? 'red' : ''}}
                id="district" type="text" {...register('district', {
                required: true,
                pattern: /^[a-zA-Z0-9\s,'-]*$/,
                maxLength: 50
              })}/>
          </div>
            { errors.district?.type === 'required' && <p className='message-error'>Debes ingresar tu zona</p> }
            { errors.district?.type === 'maxLength' && <p className='message-error'>Solo se permiten 50 caracteres</p> }
            { errorsExVali?.map((error) => error.district && <p className='message-error'>{error.district}</p>) }


          <div className="register-form-group">
              <label htmlFor="address">Ingresa tu dirección</label>
              <input
                style={{borderColor: error?.message?.length > 0 || errorsExVali?.address?.length > 0 || errors.address?.type.length > 0 ? 'red' : ''}}
                id="address" 
                placeholder="Ingresa una direccion Ej: Calle-40 # 30Sur"
                type="text" {...register('address', {
                required: true,
                maxLength: 100
              })}/>
          </div>
            { errors.address?.type === 'required' && <p className='message-error'>Debes ingresar una dirección</p> }
            { errors.address?.type === 'maxLength' && <p className='message-error'>Solo se permiten 100 caracteres</p> }
            { errorsExVali?.map((error) => error.address && <p className='message-error'>{error.address}</p>) }

          <div className="register-form-group">
              <label htmlFor="password">Ingresa una contraseña</label>
              <div className="password-container">
                <input
                  style={{borderColor: error?.message?.length > 0 || errorsExVali?.password?.length > 0 || errors.password?.type.length > 0 ? 'red' : ''}}
                  id="password"
                  type={ showPassword ? 'text' : 'password' } {...register('password', {
                  required: true,
                })}/>
                <div className='password-icons-container-show'>
                  { showPassword ? (
                    <i  onClick={() => onClickShowPassword(false)} className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i  onClick={() => onClickShowPassword(true)} className="fa-solid fa-eye"></i>
                  )}
                </div>
              </div>
              { watch('password')?.length > 0 && (
                <PasswordStrengthBar
                style={{ padding: '10px'}}
                  password={watch('password')}
                  scoreWords={['Débil', 'Aceptable', 'Fuerte', 'Muy fuerte', 'Segura']}
                  barColors={['white', 'red', '#d69304', 'violet', '#c330ff']}
                  shortScoreWord=''
                  scoreWordStyle={{color: 'white', fontFamily: 'Poppins', fontSize: '10px'}}
                />
              )}
          </div>
            { errors.password?.type === 'required' && <p className='message-error'>Debes ingresar una dirección</p> }
            { errorsExVali?.map((error) => error.password && <p className='message-error'>{error.password}</p>) }

          <div className="register-form-group" >
            <label htmlFor="avatar">¿Deseas agregar una foto? o quieres agregar un avatar personalizado?</label>
              <div className="register-form-file-seccion">
                <Controller
                  name="avatar"
                  control={control}
                  render={({ field }) => (
                    <ImgCrop rotate>
                      <Upload
                        {...field}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        maxCount={1}
                        onChange={(info) => {
                          const { fileList: newFileList } = info;
                          setFileList(newFileList);
                          field.onChange(newFileList);
                          if(fileList?.length > 0 ) { setSelectedOption(null) }
                        }}
                        onPreview={onPreview}
                      >
                        {fileList.length === 0 && <i style={{ color: 'white', fontSize:'20px' }} className="fa-solid fa-plus"></i> }
                      </Upload>
                    </ImgCrop>
                  )}
                />
                <div className="register-form-avatar-container">
                    <Radio.Group onChange={handleRadioChange} value={selectedOption}>
                      {avatarOptions.map(option => (
                        <Radio key={option.value} value={option.value}>
                          <img src={option.img} alt={option.value}/>
                        </Radio>
                      ))}
                    </Radio.Group>
                </div>
              </div>
              { messageAvatar?.length > 0 && <p className='message-error' style={{ textAlign: 'center' }}>{messageAvatar}</p> }
            </div>
          <button type="submit" className="register-button-container">
              <span>Confirmar</span>
          </button>
      </form>

      </div>
  </div>
  );
};

export default RegisterForm;
