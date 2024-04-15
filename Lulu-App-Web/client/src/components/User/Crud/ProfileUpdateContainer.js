import { useEffect, useState } from "react";
import ProfileUpdateForm from "./ProfileUpdateForm"
import { getUser, putUpdateUser } from "../../../services/UserService";


const ProfileUpdateContainer = () => {

    const [ user, setUser ] = useState([] || null);
    const [ notModified, setNotModified ] = useState('');
    const [ messageSuccess, setMessageSuccess ] = useState('');
    const [ emailExisting, setEmailExisting ] = useState('');


    const _loadUser = async () => {    
        const res = await getUser();
        if (res?.status === 200) { setUser(res.data); };
        if (res?.status === 400) { console.error(res.data.message); };
    };

    useEffect(() => { _loadUser(); }, []);

    const handleUserUpdate = async (data) => {
        const res = await putUpdateUser(data);
        if(res?.status === 200) { setMessageSuccess('Haz actualizado correctamente'); };
        if(res?.status === 404) { console.error(res?.data.message); };
        if(res?.status === 304) { setNotModified('Debes modificar algun campo para continuar'); };
        if(res?.status === 409) { setEmailExisting('El email ya esta en uso, agrega uno diferente'); };


    };

    const avatarOptions = [
      { value: 'avatar-1.png', img: '/img/avatars/avatar-1.png' },
      { value: 'avatar-2.png', img: '/img/avatars/avatar-2.png' },
      { value: 'avatar-3.png', img: '/img/avatars/avatar-3.png' }
    ];

    useEffect(() => {
      const time = setTimeout(() => {
        setEmailExisting('');
        setNotModified('');
      }, 6000);
      return () => clearTimeout(time);
    }, [notModified, emailExisting]);

  return (
    <ProfileUpdateForm 
        user={user}
        handleUserUpdate={handleUserUpdate}
        avatarOptions={avatarOptions}
        notModified={notModified}
        messageSuccess={messageSuccess}
        setMessageSuccess={setMessageSuccess}
        emailExisting={emailExisting}
    />
  )
}

export default ProfileUpdateContainer