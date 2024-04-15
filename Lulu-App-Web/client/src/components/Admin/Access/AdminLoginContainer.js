import React, { useContext, useEffect } from 'react'
import AdminFormLogin from './AdminFormLogin'
import { AdminContext } from '../../../Context/AdminContext';


const AdminLoginContainer = () => {

  const { handleOnSubmit, errors, unautorized, isAutorized } = useContext(AdminContext);


  return (
    <AdminFormLogin
      handleOnSubmit={handleOnSubmit}
      errors={errors}
      unautorized={unautorized}
      isAutorized={isAutorized}
    />
  )
}

export default AdminLoginContainer