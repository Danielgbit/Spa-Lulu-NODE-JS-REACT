import { useContext } from "react"
import { UserContext } from "../../Context/UserContext"
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";


const ProtectedRoute = () => {

    const { isAutenticated, isLoading } = useContext(UserContext);
    
    if (isLoading) return <h1>Cargando...</h1>
    if (!isAutenticated) return <Navigate to={'/ingreso'} replace/> 

  return (
    <Outlet/>
  )
}

export default ProtectedRoute

