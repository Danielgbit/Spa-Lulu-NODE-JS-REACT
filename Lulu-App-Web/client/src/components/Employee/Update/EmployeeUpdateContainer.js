import EmployeeFormUpdate from "./EmployeeFormUpdate";
import { putUpdateEmployee, getEmployeeDetail } from "../../../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";



const EmployeeUpdateContainer = () => {

    const navigate = useNavigate();
    const [ employee, setEmployee ] = useState([] || null);
    const [ isLoadingEmployee, setisLoadingEmployee ] = useState(true);
    const { id } = useParams();

    const loadEmployee = async () => {
        const response = await getEmployeeDetail(id);
        if (response?.status === 200) {
            setEmployee(response.data.employeeDetail);
        }

        setisLoadingEmployee(false);
        
    };

    const updateEmployee = async (body) => {
        const response = await putUpdateEmployee(id, body);
        if (response?.status === 200) {
            navigate('/admin/employee');
        };
    };

    useEffect(() => {
        loadEmployee();
    }, []);

    
    return(
        <>
            {isLoadingEmployee ? ( <Spinner/> ) : ( 
                <EmployeeFormUpdate
                    updateEmployee={updateEmployee}
                    employee={employee}
                />
            )}
        </>
    );
};

export default EmployeeUpdateContainer