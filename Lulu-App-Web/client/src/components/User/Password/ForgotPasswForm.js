import { useForm } from "react-hook-form"
import { message } from 'antd';
import { useEffect } from "react";

const ForgotPasswordForm = ({ sendEmail, messageSuccess, setMessageSuccess }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const handleOnSubmit = (data) => {
        if (data.email.length > 0) { sendEmail(data); };
    };
    
    const success = () => {
        messageApi.open({ type: 'success', content: messageSuccess, 
        style: {
            fontFamily: 'Poppins',
            letterSpacing: '1px',
        }});
    };

    useEffect(() => {
        if (messageSuccess.length > 0) {
            success();
            setMessageSuccess('');
        };
    }, [messageSuccess]);


  return (
    <div className="profile-update-container" style={{ height: '100vh' }}>
         {contextHolder}
        <div className="profile-update-form-container">
            <form onSubmit={handleSubmit(handleOnSubmit)}  className="profile-update-form">
                <div className="profile-update-form-group">
                    <label>Ingresa tu correo o email para continuar</label>
                    <input type="email" name="email" {...register('email', {
                        required: true,
                    })}/>
                </div>
                { errors.email?.type === 'required' && <span className="message-error" >Debes ingresar tu email registrado</span> }
                <button type="submit" className="profile-update-button-container" >
                    <span>Continuar</span>
                </button>
            </form>
        </div>
    </div>
  )
}

export default ForgotPasswordForm