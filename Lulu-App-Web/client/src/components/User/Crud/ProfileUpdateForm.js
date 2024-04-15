import { useEffect, useState } from 'react';
import { useForm, Controller }  from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Upload, Radio, Input, Tooltip } from 'antd';
import ImgCrop from 'antd-img-crop';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'


const ProfileUpdateForm = ({ user, handleUserUpdate, avatarOptions, notModified, messageSuccess, setMessageSuccess, emailExisting }) => {

    const { register, formState: {errors}, handleSubmit, setValue, control, watch } = useForm();
  const [fileList, setFileList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [messageAvatar, setMessageAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const toggleEditing = () => setIsEditing(!isEditing);

    const onSubmit = (data) => {
        handleUserUpdate({
            ...data, 
            avatar: data.avatar?.length > 0 && data.avatar[0].originFileObj, 
            avatarDefault: data.avatar?.length > 0 ? null : selectedOption
        });
    };

    useEffect(() => {
        setValue('firstName', user.firstName);
        setValue('middleName', user.middleName);
        setValue('lastName', user.lastName);
        setValue('city', user.city);
        setValue('email', user.email);
        setValue('phoneNumber', user.phoneNumber);
        setValue('avatar', null);
        setValue('district', user.district);
        setValue('address', user.address);

    }, [user]);

    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value)
        if (watch('avatar')?.length) { 
          setSelectedOption(null); 
          setMessageAvatar('Debes escoger imagen o avatar');
        };
      };
      
  useEffect(() => {
    if (messageAvatar?.length > 0) {
      const time = setTimeout(() => {
        setMessageAvatar('');
      }, 5000);
      return () => clearTimeout(time); 
    }
  }, [messageAvatar]);

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

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };

      
  useEffect(() => {
    if (messageSuccess.length > 0) {
        toast.success(messageSuccess);
        setIsLoading(true);
        const loading = setTimeout(() => {
          navigate('/profile');
          setIsLoading(false);
        }, 3000);
        return () => clearTimeout(loading), setMessageSuccess('');
      };
  }, [messageSuccess]);

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
    <div className="profile-update-container">
        <ToastContainer  className='toast-container-style'/>
        <div className="profile-update-form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="profile-update-form">
        <div className="profile-update-form-group">
            <label htmlFor="firstName">Primer nombre</label>
            <Controller name="firstName" control={control}
                rules={{
                    required: true,
                    pattern: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/,
                    maxLength: 50
                }}
                render={({ field }) => (
                <Input {...field} 
                    style={{ border: errors.firstName ? '2px solid red' : '1px solid #cf6aff', backgroundColor: isEditing && '#ad47a7', color: isEditing ? '#ffcdfc' : 'white' }}
                    className='userUpdate-input'
                    disabled={!isEditing}
                    suffix={ isEditing ? ( <Tooltip title="Cancelar"> <CloseOutlined onClick={toggleEditing} /></Tooltip> ) : ( <Tooltip title="Editar"> <EditOutlined onClick={toggleEditing} /> </Tooltip> )}
                />
                )} 
            />
        </div>
                { errors.firstName?.type === 'required' && <p className='message-error'>Debes ingresar tu primer nombre</p> }
                { errors.firstName?.type === 'pattern' && <p className='message-error'>Solo se permiten letras</p> }
                { errors.firstName?.type === 'maxLength' && <p className='message-error'>Solo se permiten 50 caracteres</p> }
            <div className="profile-update-form-group">
                    <label htmlFor="middleName">Segundo nombre</label>
                    <Controller name="middleName" control={control}
                    rules={{
                        pattern: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/,
                        maxLength: 50
                    }}
                    render={({ field }) => (
                    <Input {...field} 
                        style={{ border: errors.middleName ? '2px solid red' : '1px solid #cf6aff', backgroundColor: isEditing && '#ad47a7', color: isEditing ? '#ffcdfc' : 'white' }}
                        className='userUpdate-input'
                        disabled={!isEditing}
                        suffix={ isEditing ? ( <Tooltip title="Cancelar"> <CloseOutlined onClick={toggleEditing} /></Tooltip> ) : ( <Tooltip title="Editar"> <EditOutlined onClick={toggleEditing} /> </Tooltip> )}
                    />
                    )} 
                />
            </div>
                { errors.middleName?.type === 'pattern' && <p className='message-error'>Solo se permiten letras</p> }
                { errors.middleName?.type === 'maxLength' && <p className='message-error'>Solo se permiten 50 caracteres</p> }
            <div className="profile-update-form-group">
                <label htmlFor="lastName">Apellido</label>
                <Controller name="lastName" control={control}
                    rules={{
                        required: true,
                        pattern: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/,
                        maxLength: 50
                    }}
                    render={({ field }) => (
                    <Input {...field} 
                        style={{ border: errors.lastName ? '2px solid red' : '1px solid #cf6aff', backgroundColor: isEditing && '#ad47a7', color: isEditing ? '#ffcdfc' : 'white' }}
                        className='userUpdate-input'
                        disabled={!isEditing}
                        suffix={ isEditing ? ( <Tooltip title="Cancelar"> <CloseOutlined onClick={toggleEditing} /></Tooltip> ) : ( <Tooltip title="Editar"> <EditOutlined onClick={toggleEditing} /> </Tooltip> )}
                    />
                    )} 
                />
            </div>
                { errors.lastName?.type === 'required' && <p className='message-error'>Debes ingresar tu apellido</p> }
                { errors.lastName?.type === 'pattern' && <p className='message-error'>Solo se permiten letras</p> }
                { errors.lastName?.type === 'maxLength' && <p className='message-error'>Solo se permiten 50 caracteres</p> }


            <div className="profile-update-form-group">
                <label htmlFor="phoneNumber">Numero de telefono</label>
                <Controller name="phoneNumber" control={control}
                    rules={{
                        required: true,
                        valueAsNumber: true,
                        maxLength: 15
                    }}
                    render={({ field }) => (
                    <Input {...field} 
                        style={{ border: errors.phoneNumber ? '2px solid red' : '1px solid #cf6aff', backgroundColor: isEditing && '#ad47a7', color: isEditing ? '#ffcdfc' : 'white' }}
                        className='userUpdate-input'
                        disabled={!isEditing}
                        suffix={ isEditing ? ( <Tooltip title="Cancelar"> <CloseOutlined onClick={toggleEditing} /></Tooltip> ) : ( <Tooltip title="Editar"> <EditOutlined onClick={toggleEditing} /> </Tooltip> )}
                    />
                    )} 
                />
            </div>
                { errors.phoneNumber?.type === 'required' && <p className='message-error'>Debes ingresar un numero de telefono</p> }
                { errors.phoneNumber?.type === 'valueAsNumber' && <p className='message-error'>Debe ser un valor numerico</p> }
                { errors.phoneNumber?.type === 'maxLength' && <p className='message-error'>Solo se permiten 15 caracteres</p> }

            <div className="profile-update-form-group">
                <label htmlFor="email">Correo</label>
                <Controller name="email" control={control}
                    rules={{
                        required: true,
                        pattern: /\S+@\S+\.\S+/,
                        maxLength: 100
                    }}
                    render={({ field }) => (
                    <Input {...field} 
                        style={{ border: errors.email || emailExisting ? '2px solid red' : '1px solid #cf6aff', backgroundColor: isEditing && '#ad47a7', color: isEditing ? '#ffcdfc' : 'white' }}
                        className='userUpdate-input'
                        disabled={!isEditing}
                        suffix={ isEditing ? ( <Tooltip title="Cancelar"> <CloseOutlined onClick={toggleEditing} /></Tooltip> ) : ( <Tooltip title="Editar"> <EditOutlined onClick={toggleEditing} /> </Tooltip> )}
                    />
                    )} 
                />
            </div>
                { errors.email?.type === 'required' && <p className='message-error'>Debes ingresar un correo</p> }
                { errors.email?.type === 'pattern' && <p className='message-error'>Debe ser un formato valido de email</p> }
                { errors.email?.type === 'maxLength' && <p className='message-error'>Solo se permiten 100 caracteres</p> }
                { emailExisting?.length > 0 && <p className='message-error'>{emailExisting}</p> }

            <div className="profile-update-form-group">
                <label htmlFor="city">Ciudad</label>

                <Controller name="city" control={control}
                    rules={{
                        required: true,
                        pattern: /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/,
                        maxLength: 50
                    }}
                    render={({ field }) => (
                    <Input {...field} 
                        style={{ border: errors.city ? '2px solid red' : '1px solid #cf6aff', backgroundColor: isEditing && '#ad47a7', color: isEditing ? '#ffcdfc' : 'white' }}
                        className='userUpdate-input'
                        disabled={!isEditing}
                        suffix={ isEditing ? ( <Tooltip title="Cancelar"> <CloseOutlined onClick={toggleEditing} /></Tooltip> ) : ( <Tooltip title="Editar"> <EditOutlined onClick={toggleEditing} /> </Tooltip> )}
                    />
                    )} 
                />
            </div>
                { errors.city?.type === 'required' && <p className='message-error'>Debes seleccionar una ciudad</p> }
                { errors.city?.type === 'pattern' && <p className='message-error'>Solo se permite texto</p> }
                { errors.city?.type === 'maxLength' && <p className='message-error'>Solo se permiten 50 caracteres</p> }

            <div className="profile-update-form-group">
                <label htmlFor="district">Barrio</label>
                <Controller name="district" control={control}
                    rules={{
                        required: true,
                        pattern: /^[a-zA-Z0-9\s,'-]*$/,
                        maxLength: 50
                    }}
                    render={({ field }) => (
                    <Input {...field} 
                        style={{ border: errors.district ? '2px solid red' : '1px solid #cf6aff', backgroundColor: isEditing && '#ad47a7', color: isEditing ? '#ffcdfc' : 'white' }}
                        className='userUpdate-input'
                        disabled={!isEditing}
                        suffix={ isEditing ? ( <Tooltip title="Cancelar"> <CloseOutlined onClick={toggleEditing} /></Tooltip> ) : ( <Tooltip title="Editar"> <EditOutlined onClick={toggleEditing} /> </Tooltip> )}
                    />
                    )} 
                />
            </div>
                { errors.district?.type === 'required' && <p className='message-error'>Debes ingresar tu zona</p> }
                { errors.district?.type === 'maxLength' && <p className='message-error'>Solo se permiten 50 caracteres</p> }  

            <div className="profile-update-form-group">
                <label htmlFor="address">Barrio</label>
                <Controller name="address" control={control}
                    rules={{
                        required: true,
                        maxLength: 100
                    }}
                    render={({ field }) => (
                    <Input {...field} 
                        style={{ border: errors.address ? '2px solid red' : '1px solid #cf6aff', backgroundColor: isEditing && '#ad47a7', color: isEditing ? '#ffcdfc' : 'white' }}
                        className='userUpdate-input'
                        disabled={!isEditing}
                        suffix={ isEditing ? ( <Tooltip title="Cancelar"> <CloseOutlined onClick={toggleEditing} /></Tooltip> ) : ( <Tooltip title="Editar"> <EditOutlined onClick={toggleEditing} /> </Tooltip> )}
                    />
                    )} 
                />
            </div>  
                { errors.address?.type === 'required' && <p className='message-error'>Debes ingresar una dirección</p> }
                { errors.address?.type === 'maxLength' && <p className='message-error'>Solo se permiten 100 caracteres</p> }
            
            <div className="profile-update-form-group">
                <label htmlFor="avatar">¿Quieres cambiar tu avatar?</label>

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
            </div>
                

            <Link to={'/profile/update/password'}>
                <button className='update-form-update-modified-passw'>
                    <div className="text">
                        <span>¿Deseas cambiar</span>
                        <span>la</span>
                        <span>contraseña?</span>
                    </div>
                    <div className="clone">
                        <span>¿Deseas cambiar</span>
                        <span>la</span>
                        <span>contraseña?</span>
                    </div>
                    <i class="fa-solid fa-lock"></i>
                </button>
            </Link>
            { notModified?.length > 0 && <p className='message-error' style={{ 
                backgroundColor: 'black',
                padding: '12px 2px', 
                borderRadius: '5px',
            }} >{notModified}</p> }
            <button type="submit" className="profile-update-button-container">
                <span>Actualizar</span>
            </button>
        </form>
        </div>
    </div>
  )
}

export default ProfileUpdateForm
