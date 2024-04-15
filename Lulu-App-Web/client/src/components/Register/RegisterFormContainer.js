import RegisterForm from "./RegisterForm";
import { UserContext } from '../../Context/UserContext';
import { useContext, useEffect, useState } from "react";
import { getAllContries } from '../../utils/apiCountriesCop';

const RegisterFormContainer = () => {

    const { createUser, errorsExVali, isExisting } = useContext(UserContext);
    const [ cities, setCities ] = useState([]);

    const _createUser = (user) => {
        createUser(user);
    };

    const loadCountries = async () => {
        const res = await getAllContries();
        if(res?.status === 200 ) { 
            const mappedCities = res.data.map(city =>  city.name);
            setCities(mappedCities);
        };
    };

    useEffect(() => {
        loadCountries();
    }, []);

    const avatarOptions = [
        { value: 'avatar-1.png', img: '/img/avatars/avatar-1.png' },
        { value: 'avatar-2.png', img: '/img/avatars/avatar-2.png' },
        { value: 'avatar-3.png', img: '/img/avatars/avatar-3.png' }
      ];

    return (
        <RegisterForm
            createUser={_createUser}
            errorsExVali={errorsExVali}
            isExisting={isExisting}
            cities={cities}
            avatarOptions={avatarOptions}
        />
    )
};

export default RegisterFormContainer;