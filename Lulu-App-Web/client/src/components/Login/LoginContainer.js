import LoginForm from "./LoginForm";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { AdminContext } from "../../Context/AdminContext";

const LoginContainer = () => {
  const { sendDataLogin, errors, isIncorrectUser, isAutenticated } = useContext(UserContext);
  const { isAutorized } = useContext(AdminContext);

  const navigate = useNavigate();
  
  const handleDataForm = async (data) => {
      await sendDataLogin(data);
  };
/* 
  useEffect(() => {
    if (isAutorized) {
      <Navigate to={'/'} replace />
    };
  }, []); */  

  useEffect(() => {
    if (isAutenticated) {
      navigate('/');
    }
  }, [isAutenticated]);
  
  return (
    <div className="login-page-container-max">
      <LoginForm 
        handleDataForm={handleDataForm} 
        errors={errors}
        isIncorrectUser={isIncorrectUser}
        isAutenticated={isAutenticated}
      />
    </div>
  );
};

export default LoginContainer;
