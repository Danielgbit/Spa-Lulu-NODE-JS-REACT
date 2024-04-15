import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import ServiceList from './ServiceList';

const ServiceListContainer = () => {

    const { id } = useParams();

    const [serviceCategory, setServiceCategory] = useState([]);


    useEffect(() => {
        const fetchProductsCategory = async () => {
            try {   
                const response = await axios.get(`http://localhost:4000/service/category/${id}`);

                if (!response) {
                    throw new Error('Fetch product by category failed');
                };

                const data = await response.data;
                setServiceCategory(data);

            } catch (error) {
                console.error(error);
            };
        };

        fetchProductsCategory();
    }, [id]);

    return(
        <>
            <ServiceList servicesCategory={serviceCategory}/>
        </>
    );
};

export default ServiceListContainer;