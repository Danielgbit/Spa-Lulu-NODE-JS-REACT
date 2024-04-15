import AppointForm from "./AppointForm";
import { getEmployees } from "../../../services/AppointmentService";
import { getServices } from "../../../services/ServicesService";
import { getClients } from "../../../services/ClientService";
import { postAppointment } from "../../../services/AppointmentService";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const AppointFormContainer = () => {
  const [employees, setEmployees] = useState(null);
  const [services, setServices] = useState(null);
  const [clients, setClients] = useState(null);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate(); 

  const loadEmployees = async () => {
    const response = await getEmployees();
    if (response?.status === 200) {
      setEmployees(response.data.allEmployees);
    }
    setIsLoading(false)
  };

  const loadServices = async () => {
    const response = await getServices();
    if (response?.status === 200) {
      setServices(response.data.allServices);
    }
  };

  const loadClients = async () => {
    const response = await getClients();
    if (response?.status === 200) {
      setClients(response.data.allClients);
    }
  };

  useEffect(() => {
    loadEmployees();
    loadServices();
    loadClients();
  }, []);

  const createAppointment = async (data) => {
    const response = await postAppointment(data);
    if (response?.status === 400) {
      setErrors(response.data.errors);
    }
    if (response?.status === 201) {
      navigate("/admin/citas");
    }
  };

  return (
    <>
      {isLoading ? (
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
        <AppointForm
          employees={employees}
          services={services}
          clients={clients}
          createAppointment={createAppointment}
          errors={errors}
        />
      )}
    </>
  );
};

export default AppointFormContainer;
