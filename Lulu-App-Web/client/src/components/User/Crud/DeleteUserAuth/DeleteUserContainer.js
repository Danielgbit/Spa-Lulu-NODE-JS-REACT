import DeleteUserForm from "./DeleteUserForm";
import { deleteUser } from '../../../../services/UserService';
import { useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import cookie from 'js-cookie';
import { UserContext } from "../../../../Context/UserContext";


const DeleteUserContainer = () => {

  const { setUserData, setIsAutenticated } = useContext(UserContext);

  const [ error, setError ] = useState([]);
  const navigate = useNavigate();

  const actionTimeOut = () => {
    const time = setTimeout(() => {
      cookie.remove('token');
      setUserData([]);
      setIsAutenticated(false);
      navigate('/');
    }, 4000);
    return () => clearTimeout(time);
};

  const handleUserDelete = async (body) => {
    if (body.password.length > 0) {
        const res = await deleteUser(body);
        if(res?.status === 200) { toast.success("Esperamos volver a verte 🖐️"); actionTimeOut();  }
        if(res?.status !== 200) { setError(res?.data); };
    } 
  };

  useEffect(() => {
    if (error?.message?.length > 0) {
      const time = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => clearTimeout(time);
    };
  }, [error]);

  return (
    <DeleteUserForm handleUserDelete={handleUserDelete} error={error}/>
  )
}

export default DeleteUserContainer