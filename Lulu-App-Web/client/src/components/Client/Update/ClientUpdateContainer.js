import { useNavigate, useParams } from "react-router-dom";
import ClientFormUpdate from "./ClientFormUpdate";
import { putClient, getClient } from "../../../services/ClientService";
import { useEffect, useState } from "react";

const ClientUpdateContainer = () => {
    
    const { id } = useParams();
    const [ errors, setErrors ] = useState(null);
    const [ client, setClient ] = useState(null);
    const navigate = useNavigate();


    const loadClient = async () => {
        const response = await getClient(id);
        if (response?.status === 200) {
            setClient(response.data.clientDetail);
        };
    };

    const updateClient = async (body) => {
        const response = await putClient(id, body);
        if (response.status === 400) {
            setErrors(response.data.errors);
        };

        if (response.status === 200) {
            navigate('/admin/client');
        };

    };

    useEffect(() => {
        loadClient();
    }, []);

    return(
        <ClientFormUpdate
            errors={errors}
            updateClient={updateClient}
            client={client}
        />
        
    )
};

export default ClientUpdateContainer;