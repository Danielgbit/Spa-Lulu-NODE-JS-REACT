import ServiceFormUpdate from "./ServiceFormUpdate";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { getCategories, getService, putService } from "../../../services/ServicesService";

const ServiceUpdateContainer = () => {

    const { id } = useParams();
    const [ categories, setCategories ] = useState(null);
    const [ service, setService ] = useState(null);
    const [ isLoadingCategories, setIsLoadingCategories ] = useState(true);
    const [ isLoadingService, setIsLoadingService ] = useState(true);
    const [ errors, setErrors ] = useState(null);
    const [ messageErr, setMessageErr ] = useState('');

    const navigate = useNavigate();


    const loadCategories = async () => {
        const response = await getCategories();
        if (response.status === 200) {
            setCategories(response.data.allCategories);
        };

        setIsLoadingCategories(false);
    };

    const loadService = async () => {
        const response = await getService(id);
        if (response.status === 200) {
            setService(response.data.serviceDetail);
        };

        setIsLoadingService(false);
    };

    const updateService = async (body) => {
        const response = await putService(id, body);
        if (response?.status === 400) { setErrors(response.data.errors); };
        if (response?.status === 304) { setMessageErr('Debes modificar algun campo para continuar'); }
        if (response?.status === 200) { navigate('/admin/service');};
    };

    useEffect(() => {
        const time = setTimeout(() => {
            setMessageErr('');
        }, 4000);
        return () => clearTimeout(time);
    }, [messageErr])

    useEffect(() => {
        loadCategories();
        loadService();
    }, []);

    return(
        <>
            {isLoadingCategories || isLoadingService ? ( <Spinner/> ) : (
                <ServiceFormUpdate
                    categories={categories}
                    service={service}
                    updateService={updateService}
                    errors={errors}
                    messageErr={messageErr}
                />
            )}
        </>
    )
};

export default ServiceUpdateContainer;