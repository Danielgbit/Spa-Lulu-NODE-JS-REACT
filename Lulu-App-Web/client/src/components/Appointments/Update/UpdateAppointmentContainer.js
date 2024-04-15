import { useNavigate, useParams } from "react-router-dom";
import UpdateFormAppointment from "./UpdateFormAppointment";
import {
  getAppointmentDetailUpdate,
  putAppointment,
  getEmployees,
} from "../../../services/AppointmentService";
import { getServices } from "../../../services/ServicesService";
import { getClients } from "../../../services/ClientService";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";

const UpdateAppointmentContainer = () => {
  const { id } = useParams();
  const [employees, setEmployees] = useState(null);
  const [isloading, setIsLoading] = useState(true);

  const [services, setServices] = useState(null);
  const [clients, setClients] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const loadEmployees = async () => {
    const response = await getEmployees();
    if (response.status === 200) {
      setEmployees(response.data.allEmployees);
    }
    setIsLoading(false);
  };

  const loadServices = async () => {
    const response = await getServices();
    if (response.status === 200) {
      setServices(response.data.allServices);
    }
  };

  const loadClients = async () => {
    const response = await getClients();
    if (response.status === 200) {
      setClients(response.data.allClients);
    }
  };

  const loadAppointmentDetail = async () => {
    const response = await getAppointmentDetailUpdate(id);
    if (response.status === 200) {
      setAppointment(response.data.appointmentDetail);
    }
  };

  const updateAppointment = async (body) => {
    const response = await putAppointment(id, body);
    if (response.status === 400) {
      setErrors(response.data.errors);
    }
    if (response.status === 200) {
      navigate("/admin/citas");
    }
  };

  useEffect(() => {
    loadEmployees();
    loadServices();
    loadClients();
    loadAppointmentDetail();
  }, []);


  return (
    <> 
      {isloading ? (
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
        <UpdateFormAppointment
          employees={employees}
          services={services}
          clients={clients}
          appointmentDetail={appointment}
          updateAppointment={updateAppointment}
          errors={errors}
        />
      )}
    </>
  );
};

export default UpdateAppointmentContainer;
