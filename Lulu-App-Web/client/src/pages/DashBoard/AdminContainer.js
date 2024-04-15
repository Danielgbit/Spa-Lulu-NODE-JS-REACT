import Admin from "./Admin";
import { getGains } from "../../services/GainService";
import { getLengthUsers } from "../../services/UserService";

import { useEffect, useState } from "react";
import dayjs from "dayjs";


const AdminContainer = () => {

    const [ gains, setGains ] = useState([] || null);
    const [ users, setUsers ] = useState(0);


    const loadGains = async () => {
        const res = await getGains();
        if (res?.status === 200) { setGains(res.data.gains) }
    };

    useEffect(() => { loadGains() }, []);

    function getTodayTotal(gains) {
        const today = dayjs().format('YYYY-MM-DD');
        let todayTotal = 0;
      
        for (const gain of gains) {
          const gainDate = dayjs(gain.dateTime).format('YYYY-MM-DD');
      
          if (gainDate === today) {
            todayTotal += gain.amount;
          }
        }
      
        return todayTotal;
      }
      
      // Calcular el total del día actual
      const todayTotal = getTodayTotal(gains);

      const loadLengthUsers = async () => {
        const res = await getLengthUsers();
        if(res?.status === 200) { setUsers(res.data.length); };
      };

      useEffect(() => {loadLengthUsers(); }, [])

      const [currentTime, setCurrentTime] = useState(dayjs());

        useEffect(() => {
            const intervalId = setInterval(() => {
            setCurrentTime(dayjs());
            }, 1000);

            return () => clearInterval(intervalId);
        }, []);

        const ingresosAnuales = [
          { mes: "Enero", ingresos: 12000 },
          { mes: "Febrero", ingresos: 0 },
          { mes: "Marzo", ingresos: 0 },
          { mes: "Abril", ingresos: 0 },
          { mes: "Mayo", ingresos: 0 },
          { mes: "Junio", ingresos: 0 },
          { mes: "Julio", ingresos: 0 },
          { mes: "Agosto", ingresos: 0 },
          { mes: "Septiembre", ingresos: 0 },
          { mes: "Octubre", ingresos: 0 },
          { mes: "Noviembre", ingresos: 0 },
          { mes: "Diciembre", ingresos: 0 },
        ];
    return(
        <Admin
            users={users}
            todayTotal={todayTotal}
            currentTime={currentTime}
            ingresosAnuales={ingresosAnuales}
        />
    );
};

export default AdminContainer;