import { Navigate, useParams } from "react-router-dom"
import ResetPasswForm from "./ResetPasswForm"
import { getResetPassword } from "../../../services/UserService";
import { useEffect, useState } from "react";

const ResetPasswContainer = () => {


    const { token } = useParams();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const loadAuthToken = async () => {
        const res = await getResetPassword(token);
        if(res?.status === 200) { console.log(res.data.message); }
        if(res?.status === 400) { setShouldRedirect(true); }
    };

    useEffect(() => {
        loadAuthToken();
    }, []);

    if (shouldRedirect) {
        return <Navigate to="/forgot-password?message=ingreso incorrecto" replace />;
    }


  return (
    <ResetPasswForm/>
  )
}

export default ResetPasswContainer
