import React, { useEffect, useState } from "react";
import { postLoginAdmin, getAuthToken } from "../services/AdminService";
import cookies from "js-cookie";

export const AdminContext = React.createContext({});

export default function AdminProvider({ children }) {
  const [errors, setErrors] = useState([]);
  const [unautorized, setUnautorized] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isAutorized, setIsAutorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState([]);

  
  const handleOnSubmit = async (data) => {
    const res = await postLoginAdmin(data);
    if (res.status === 400) return setErrors(res.data.errors);
    if (res.status === 404) return setUnautorized(res.data.message);
    if (res.status === 200) setIsLogin(true); setIsAutorized(true);
  };
  
  useEffect(() => {
    if (errors.length > 0 || unautorized.length > 0) {
      const time = setTimeout(() => {
        setErrors([]);
        setUnautorized("");
      }, 6000);
      return () => clearTimeout(time);
    }
  }, [unautorized, errors]);

  const loadAuth = async () => {
    const cookie = cookies.get();

    if (!cookie.token) {
      setAdmin(null);
      setIsAutorized(false);
      setIsLoading(false);
      return;
    }

    const res = await getAuthToken();
    if (res.status !== 200) {
      setAdmin(null);
      setIsAutorized(false);
      setIsLoading(false);
      return;
    }
    if (res.status === 200) {
      setAdmin(res.data.admin);
      setIsAutorized(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
      loadAuth();
  }, [isLogin, isAutorized]);

  const logoutAdmin = () => {
    cookies.remove("token");
    setAdmin(null);
    setIsAutorized(false);
  };

  return (
    <AdminContext.Provider
      value={{
        handleOnSubmit,
        unautorized,
        errors,
        isAutorized,
        isLoading,
        admin,
        logoutAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
