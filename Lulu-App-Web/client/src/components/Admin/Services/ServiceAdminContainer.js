import ServiceAdmin from "./ServiceAdmin";
import { getServices, deleteService } from "../../../services/ServicesService";
import { useEffect, useState } from "react";
import { Spinner } from '@chakra-ui/react';


const ServiceAdminContainer = () => {
  const [services, setServices] = useState(null);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  const loadServices = async () => {
    const response = await getServices();
    if (response?.status === 200) {
      setServices(response.data.allServices);
    }

    setIsLoadingServices(false);
  };

  const _destroyService = async (id) => {
    const response = await deleteService(id);
    if (response?.status === 200) {
      loadServices();
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <>
      {isLoadingServices ? (
        <div className="spinner-container">
          <Spinner
            thickness="4px"
            speed="350ms"
            emptyColor="gray.200"
            color="violet.200"
            size="xl"
          />
        </div>
      ) : (
        <ServiceAdmin services={services} destroyService={_destroyService} />
      )}
    </>
  );
};

export default ServiceAdminContainer;
