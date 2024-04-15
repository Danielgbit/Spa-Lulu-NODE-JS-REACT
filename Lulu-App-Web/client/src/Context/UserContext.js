import React, { useEffect, useState } from "react";
import { postLogin, postLogout, postRegister, verifyToken, getUser } from '../services/UserService';
import cookies from 'js-cookie';

export const UserContext = React.createContext({});
export default function UserProvider({ children }) {

    const [ userData, setUserData ] = useState([]);
    const [ errorsExVali, setErrorsExVali ] = useState([] || null);
    const [ errors, setErrors ] = useState([] || null);
    const [ isExisting, setIsExisting ] = useState([]);
    const [ isIncorrectUser, setIsIncorrectUser ] = useState([]);
    const [ isAutenticated, setIsAutenticated ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);

    const [ username, setUsername ] = useState('');
    const [ messageToast, setMessageToast ] = useState('');
    const [ messageLogoutToast, setMessageLogoutToast ] = useState('');
    const [ messageAuth, setMessageAuth ] = useState('');
    const [ image, setImage ] = useState('');


    const createUser = async (data) => {
        const res = await postRegister(data);
        if (res?.status === 400) { setErrorsExVali(res.data.errors, setIsExisting(res.data.existing));};
        if (res?.status === 201) { setIsAutenticated(true); setMessageAuth('Nos alegra tenerte ¡Bienvenido! 🙌') };
    };

    const loadUser = async () => {    
        const res = await getUser();
        if (res?.status === 200) { setUserData(res.data); };
        if (res?.status === 400) { console.error(res.data.message); };
    };

    const sendDataLogin = async (data) => {
        const res = await postLogin(data);
        if (res?.status === 400) { setErrors(res.data.errors); };
        if (res?.status === 404) { setIsIncorrectUser(res.data.message); };
        if (res?.status === 200) { setIsAutenticated(true); };
    };
    

    useEffect(() => {
        if (errors.length > 0 || isIncorrectUser.length > 0 || isExisting.length > 0) {
            const time = setTimeout(() => {
                setErrors([]);
                setIsIncorrectUser([]);
                setIsExisting([])
                setErrorsExVali([])
            }, 5000);
            return () => clearTimeout(time);
        };
    }, [errors, isIncorrectUser, isExisting, errorsExVali]);


    const checkLogin = async () => {
        const cookie = cookies.get();
        if (!cookie.token) {
            setUserData(null); 
            setIsAutenticated(false); 
            setIsLoading(false);
            return;
        };

        const res = await verifyToken();

        if (res?.status === 200) {
            setUserData(res.data.user);
            setIsAutenticated(true);
            setMessageToast('Has ingresado exitosamente');
            setIsLoading(false);
        };

        if (res?.status === 401) {
            setIsAutenticated(false);
            setUserData(null);
            setIsLoading(false);
        };

        setIsLoading(false);
    };
    
    
    useEffect(() => {
        checkLogin();
    }, [isAutenticated]);

    useEffect(() => {
        setUsername(userData?.userName);
        setImage(userData?.image);

    }, [userData]);
    

    const sendLogout = async (userId) => {
        const res = await postLogout(userId);
        if ( res?.status === 200) {
            cookies.remove('token');
            setUserData(null); 
            setIsAutenticated(false); 
            setMessageLogoutToast('Esperamos volver a verte ¡Hasta pronto!');
        };
    };
    
    return (
        <UserContext.Provider
            value={{
                userData,
                errorsExVali,
                isAutenticated,
                isExisting,
                isIncorrectUser,
                isLoading,

                messageToast,
                setMessageToast,
                setMessageLogoutToast,
                messageLogoutToast,

                username,
                messageAuth,
                image,
                
                loadUser,
                sendDataLogin,
                sendLogout,
                setUserData,
                createUser,
                setIsAutenticated,
                setMessageAuth

            }}>
            {children}
        </UserContext.Provider>
    );
};