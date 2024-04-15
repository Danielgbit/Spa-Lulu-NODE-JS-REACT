import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AdminContext } from '../../Context/AdminContext'

const ProtectedRouteAdmin = () => {

  const { isAutorized, isLoading } = useContext(AdminContext);

  if (!isAutorized) return <Navigate to={'/admin/login'} replace/>
  if (isLoading) return <p>{'Cargando...'}</p> 

  return (
    <Outlet/>
  )
}

export default ProtectedRouteAdmin
