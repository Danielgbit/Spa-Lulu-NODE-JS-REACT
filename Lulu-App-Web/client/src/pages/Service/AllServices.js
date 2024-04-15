import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { getServices } from "../../services/ServicesService";

import ArticleServicesComponent from "../../components/Services/Articles/AllServicesSectionItems";
import CategoryItemsServiceContainer from "../../components/Services/Category/CategoryContainer";


const AllServices = () => {
    
    const [ allServices, setAllServices ] = useState([]);
    const [ isLoadingServices, setIsLoadingServices ] = useState(true);


    const loadServices = async ()  => {
        const response = await getServices();
        if (response?.status === 200) {
            setAllServices(response.data.allServices);
        };

        if (response?.status === 400) {
            setAllServices([] || null); 
        };

        setIsLoadingServices(false);
    };

    useEffect(() => {
        loadServices();
    }, []);

    return(
        <div className="services-container-max" >
            <h1 className="services-title">SERVICIOS</h1>
            <div className="services-container-nav-search" >
                <div className="services-div-container-search">
                </div>
                <CategoryItemsServiceContainer/>
            </div>
            {allServices.length === 0 || !allServices ? ( <p>¡Ups! No hay servicios registrados </p> ) : ( 
                isLoadingServices ? ( <Spinner/> ) : ( 
                    <ArticleServicesComponent allServices={allServices} />
                )
            )}
        </div>
    );
};

export default AllServices;