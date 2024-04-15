import GainAdmin from "./GainAdmin";
import {
  getGains,
  deleteGain,
  searchGainByDate,
  searchGainByDay,
  searchGainByEmployee,
  searchGainByCategory,
  searchGainByMethodCheckout
} from "../../../services/GainService";
import { getEmployees } from "../../../services/EmployeeService";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Spinner } from '@chakra-ui/react';


const GainAdminContainer = () => {
  const [gains, setGains] = useState([] || null);
  const [employees, setEmployees] = useState([] || null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);


  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [day, setDay] = useState("");


  const calculateCurrentWeek = () => {
    const currentDate = dayjs();
    const start = currentDate.startOf("week");
    const end = currentDate.endOf("week");
    setStartDate(start.format("YYYY-MM-DD"));
    setEndDate(end.format("YYYY-MM-DD"));
  };

  const calculateCurrentDay = () => {
    const dayjs = require("dayjs");
    const currentDay = dayjs().format('YYYY-MM-DD');
    setDay(currentDay);
  };

  const loadGains = async () => {
    const res = await getGains();
    if (res?.status === 200) { setGains(res.data.gains); }
    setIsLoading(false);
  };

  const loadEmployees = async () => {
    const res = await getEmployees();
    if (res?.status === 200) { setEmployees(res.data.allEmployees); }
    setIsLoadingEmployees(false);
  };
  
  useEffect(() => { loadGains(); loadEmployees(); }, []);


  const onClickDestroy = async (id) => {
    const res = await deleteGain(id);
    if (res?.status === 200) { loadGains(); } };


  const loadGainByDate = async () => {
    if (startDate.length > 0 && startDate.length > 0) {
      const res = await searchGainByDate(startDate, endDate);
      if (res?.status === 200) {
          setGains(res.data.gains);
      };
    };
  };

  const loadGainByDay = async (day) => {
    if (day.length > 0) {
      const res = await searchGainByDay(day);
      if (res?.status === 200) { setGains(res.data.gains); } 
    }
  };

  const loadGainByCategory = async (category) => {
    if (category.length > 0) {
      const res = await searchGainByCategory(category);
      if (res?.status === 200) { setGains(res.data.gains); } 
    }
  };

  const loadGainByMethodCheckout = async (method) => {
    if (method.length > 0) {
      const res = await searchGainByMethodCheckout(method);
      if (res?.status === 200) { setGains(res.data.gains); } 
    }
  };

  const onClickGainByDate = () => { calculateCurrentWeek(); loadGainByDate(); };

  const onClickGainByDay = () => { calculateCurrentDay(); loadGainByDay(day); };

  const onChangeDay = (day) => { loadGainByDay(day); };

  const gainByStartAndEnd = async (date) => { 
    const { start, end } = date;
    const res = await searchGainByDate(start, end);
    if (res?.status === 200) { setGains(res.data.gains); };
  };

  const gainByEmployee = async (id) => {
    if (id.toString().length > 0) {
      const res = await searchGainByEmployee(id);
      if(res?.status === 200) { setGains(res.data.gains) }
    };
  };

  return (
    <>
    {isLoading || isLoadingEmployees ? ( 
      <div className='spinner-container'>
          <Spinner
            thickness='4px'
            speed='350ms'
            emptyColor='gray.200'
            color='violet.200'
            size='xl'
          />
      </div>
    ) : (
      <GainAdmin
        gains={gains}

        onClickDestroy={onClickDestroy}
        onClickGainByDate={onClickGainByDate}

        loadGains={loadGains}
        loadGainByCategory={loadGainByCategory}
        loadGainByMethodCheckout={loadGainByMethodCheckout}

        onClickGainByDay={onClickGainByDay}
        onChangeDay={onChangeDay}
        gainByStartAndEnd={gainByStartAndEnd}
        gainByEmployee={gainByEmployee}

        employees={employees}
      />

    )}
    
    </>
  );
};

export default GainAdminContainer;
