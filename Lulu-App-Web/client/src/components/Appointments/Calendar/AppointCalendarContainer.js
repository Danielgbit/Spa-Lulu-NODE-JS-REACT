import { useParams } from "react-router-dom";
import AppointCalendar from "./AppointCalendar";
import { getAvailabilities, deleteAppointment } from "../../../services/AppointmentService";
import { useEffect, useState } from "react";


const AppointCalendarContainer = () => {

    const [ availabilities, setAvailabilities ] = useState(null);

    const { id } = useParams();

    const destroyAppointment = async (id) => {
        const response = await deleteAppointment(id);
        if (response?.status === 200) {
            loadAvailabilities();
        };
    };

    const loadAvailabilities = async () => {
        const response = await getAvailabilities(id);
        if (response?.status === 200) {
            setAvailabilities(response.data.availabilities);
        };
    };

    useEffect(() => {
        loadAvailabilities();
    }, []);
    

    return(
        <AppointCalendar
            availabilities={availabilities}
            destroyAppointment={destroyAppointment}
        />
    )
};

export default AppointCalendarContainer;