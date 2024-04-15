import ServiceFormCreate from "./ServiceFormCreate";
import { getCategories, postCreateService } from "../../../services/ServicesService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";


const ServiceCreateContainer = () => {

    const [ categories, setCategories ] = useState(null);
    const [ errors, setErrors ] = useState([] || null);
    const [ isLoadingCategories, setIsLoadingCategories ] = useState(true);

    const navigate = useNavigate();

    const loadCategories = async () => {
        const response = await getCategories();
        if (response?.status === 200) {
            setCategories(response?.data.allCategories);
        };

        setIsLoadingCategories(false);
    };

    const createService = async (body) => {
        const response = await postCreateService(body);
        if (response.status === 400) {
            setErrors(response.data.errors);
        };

        if (response.status === 201) {
            navigate('/admin/service');
        };
    };

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        if (errors?.length > 0) {
            const time = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(time); 
        }
    }, [errors, setErrors])

    return(
        <>
            {isLoadingCategories ? (<Spinner/>) : (
                <ServiceFormCreate
                    categories={categories}
                    createService={createService}
                    errors={errors}
                /> 
            )}
        </>
    )
};

export default ServiceCreateContainer;