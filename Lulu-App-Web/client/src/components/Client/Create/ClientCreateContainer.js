import ClientForm from "./ClientForm";
import { postClient } from '../../../services/ClientService';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientCreateContainer = () => {

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const createClient = async (body) => {
        const response = await postClient(body);
        if (response.status === 400) {
            const errors = response.data.errors;
            setErrors(errors);
        };
        if (response.status === 201) {
            navigate('/admin/client');
        };
    };

    useEffect(() => {
        if (errors?.length > 0) {
            const time = setTimeout(() => {
                setErrors([]);
            }, 4000);
            return () => clearTimeout(time); 
        }
    }, [errors, setErrors]);
    
    return (
        <ClientForm 
            createClient={createClient} 
            errors={errors} />
    );
};

export default ClientCreateContainer;