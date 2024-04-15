import PasswordUpdateForm from "./PasswordUpdateForm"
import { putPasswordUpdate } from '../../../../services/UserService'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useState } from "react";
import { useEffect } from "react";


const PasswordUpdateContainer = () => {

  const navigate = useNavigate();

  const [ error, setError ] = useState([]);
  
    
  const actionTimeOut = () => {
      const time = setTimeout(() => {
        navigate('/profile');
      }, 4000);
      return () => clearTimeout(time);
  };

  const updatePassword = async (body) => {
    const res = await putPasswordUpdate(body);
    if(res?.status === 200) { toast.success("Cambio de contraseña exitoso!"); actionTimeOut();};
    if(res?.status === 400) { console.error(res?.data.message); setError(res?.data) };
  };
  
  useEffect(() => {
    if (error?.message?.length > 0) {
      const time = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => clearTimeout(time);
    };
  }, [error]);

  return <>
    <PasswordUpdateForm updatePassword={updatePassword} error={error} />
  </>}

export default PasswordUpdateContainer
