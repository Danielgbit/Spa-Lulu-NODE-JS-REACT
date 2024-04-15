import axios from "axios";
import ServiceDetail from "./ServiceDetail";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getService } from "../../../services/ServicesService";
import { Spinner } from "@chakra-ui/react";


const ServiceDetailContainer = () => {

    const [serviceDetail, setServiceDetail] = useState([]);
    const [isLoadingService, setIsLoadingService] = useState(true);


    const { id } = useParams();
    
    const loadServiceDetail = async () => {
        const response = await getService(id);
        if (response?.status === 200) {
            setServiceDetail(response.data.serviceDetail);
        };

        if (response?.status === 400) {
            setServiceDetail([] || null);
        }

        setIsLoadingService(false);
    };
    
        useEffect(() => {
            loadServiceDetail();
        }, []);

    return(
        <> 
            {serviceDetail.length === 0  || !serviceDetail ? ( <p>¡Ups este servicio no existe!</p> ) : ( 
                    isLoadingService ? ( <Spinner/> ) : ( 
                       <ServiceDetail serviceDetail={serviceDetail}/>
                   )

            )}
        </>
    );
};

export default ServiceDetailContainer;