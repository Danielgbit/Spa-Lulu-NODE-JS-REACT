import AppointmentList from "./AppointmentAdmin";
import { getAppointments, deleteAppointment, getEmployees,
  searchAppointByDate,
  searchAppointByDay,
  searchAppointByEmployee
} from "../../../services/AppointmentService";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import dayjs from "dayjs";


const AppointmentAdminContainer = () => {
  const [allAppointments, setAllAppointments] = useState(null || []);
  const [allEmployees, setAllEmployees] = useState(null);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);


  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [day, setDay] = useState("");


  const loadAppointments = async () => {
    const response = await getAppointments();

    if (response?.status === 200) {
      setAllAppointments(response.data.allAppointments);
    }
    if (response?.status === 400) {
      setAllAppointments(null);
    }

    setIsLoadingAppointments(false);
  };

  const loadEmployees = async () => {
    const response = await getEmployees();
    if (response?.status === 200) {
      setAllEmployees(response.data.allEmployees);
    }
  };


  const destroyAppointment = async (id) => {
    const response = await deleteAppointment(id);
    if (response?.status === 200) {
      loadAppointments();
    }
  };

  useEffect(() => {
    loadAppointments();
    loadEmployees();
  }, []);

  //FILTER LOGIC

  const calculateCurrentWeek = () => { //CALCULAR SEMANA
    const currentDate = dayjs();
    const start = currentDate.startOf("week");
    const end = currentDate.endOf("week");
    setStartDate(start.format("YYYY-MM-DD"));
    setEndDate(end.format("YYYY-MM-DD"));
  };

  //LOAD
  const loadAppointByDate = async () => {
    if (startDate.length > 0 && startDate.length > 0) {
      const res = await searchAppointByDate(startDate, endDate);
      if (res?.status === 200) {
          setAllAppointments(res.data.allAppointments);
      };
    };
  };  
  const onClickAppointByDate = () => { calculateCurrentWeek(); loadAppointByDate(); };

  const calculateCurrentDay = () => { // CALCULAR DIA
    const dayjs = require("dayjs");
    const currentDay = dayjs().format('YYYY-MM-DD');
    setDay(currentDay);
  };

    //LOAD
    const loadAppointByDay = async (day) => {
      if (day.length > 0) {
        const res = await searchAppointByDay(day);
        if (res?.status === 200) { setAllAppointments(res.data.allAppointments); } 
      }
    };

  const onClickAppointByDay = () => { calculateCurrentDay(); loadAppointByDay(day); };

  
  const appointByStartAndEnd = async (date) => { 
    const { start, end } = date;
    const res = await searchAppointByDate(start, end);
    if (res?.status === 200) { setAllAppointments(res.data.allAppointments); };
  };


  const onChangeDay = (day) => { loadAppointByDay(day); };


  const appointByEmployee = async (id) => { //APPOINT BY EMPLOYEE
    if (id.toString().length > 0) {
      const res = await searchAppointByEmployee(id);
      if(res?.status === 200) { setAllAppointments(res.data.allAppointments) }
    };
  };
  //FILTER LOGIC

  return (
    <>
      {isLoadingAppointments ? (
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
        <AppointmentList
          onClickAppointByDate={onClickAppointByDate}
          onClickAppointByDay={onClickAppointByDay}

          appointByStartAndEnd={appointByStartAndEnd}
          appointByEmployee={appointByEmployee}

          onChangeDay={onChangeDay}

          allAppointments={allAppointments}
          destroyAppointment={destroyAppointment}
          allEmployees={allEmployees}

          loadAppointments={loadAppointments}
        />
      )}
    </>
  );
};

export default AppointmentAdminContainer;
