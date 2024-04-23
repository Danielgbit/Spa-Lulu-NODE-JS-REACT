import { useState } from "react";
import { postForgotPassword } from "../../../services/UserService";
import ForgotPasswordForm from "./ForgotPasswForm"

const ForgotPasswContainer = () => {

  const [ messageSuccess, setMessageSuccess ] = useState('');

  const sendEmail = async (data) => {
    const res = await postForgotPassword(data);
    if(res?.status === 200) { setMessageSuccess(res.data.message) };
  };

  return <ForgotPasswordForm
     sendEmail={sendEmail}
     messageSuccess={messageSuccess}
     setMessageSuccess={setMessageSuccess}
  />
}

export default ForgotPasswContainer