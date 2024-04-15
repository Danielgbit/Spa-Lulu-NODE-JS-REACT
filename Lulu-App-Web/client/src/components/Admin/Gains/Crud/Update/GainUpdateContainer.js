import GainUpdateForm from './GainUpdateForm'
import { putUpdateGain, getGain } from "../../../../../services/GainService";
import { getEmployees } from "../../../../../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from '@chakra-ui/react';

const GainUpdateContainer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ employees, setEmployees ] = useState([] || null);
    const [ gain, setGain ] = useState([] || null);
    const [ isLoading, setIsLoading ] = useState(true);



    const updateGain = async (body) => {
        if (id.toString().length > 0) {
            const res = await putUpdateGain(id, body);
            if(res?.status === 200) { navigate('/admin/gain') }
            if(res?.status === 400) { console.error(res.data.message); }
        };
    };

    const loadEmployees = async () => {
        const res = await getEmployees();
        if(res?.status === 200) { setEmployees(res.data.allEmployees) };
        setIsLoading(false);
    };

    const loadGain = async () => {
        if (id.toString().length > 0) {
            const res = await getGain(id);
            if(res?.status === 200) { setGain(res.data.gainDetail); };
            setIsLoading(false);
        }else {
            setIsLoading(true);
        };
    };


    useEffect(() => {
        loadEmployees();
        loadGain();
    }, []);

  return (
    <>  {isLoading ? ( <Spinner/> ) : ( 
        <GainUpdateForm
            updateGain={updateGain}
            employees={employees}
            gain={gain}
        />
        )}
    </>
  )
}

export default GainUpdateContainer
