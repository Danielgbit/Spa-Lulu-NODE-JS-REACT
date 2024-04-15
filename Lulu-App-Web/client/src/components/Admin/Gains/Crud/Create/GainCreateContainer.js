import GainCreateForm from "./GainCreateForm";
import { postCreateGain } from "../../../../../services/GainService";
import { getEmployees } from "../../../../../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const GainCreateContainer = () => {

    const navigate = useNavigate();
    const [ employees, setEmployees ] = useState([] || null);

    const createGain = async (body) => {
        const res = await postCreateGain(body);
        if(res?.status === 201) { navigate('/admin/gain') }
        if(res?.status === 400) { console.error(res.data.message); }
    };

    const loadEmployees = async () => {
        const res = await getEmployees();
        if(res?.status === 200) { setEmployees(res.data.allEmployees) };
    };

    useEffect(() => {
        loadEmployees();
    }, []);



  return <GainCreateForm 
    createGain={createGain}
    employees={employees}
  />;
};

export default GainCreateContainer;
