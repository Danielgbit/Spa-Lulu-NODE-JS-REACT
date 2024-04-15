import EmployeeFormCreate from "./EmployeeFormCreate";
import { postCreateEmployee } from "../../../services/EmployeeService";
import { useNavigate } from "react-router-dom";


const EmployeeCreateContainer = () => {

    const navigate = useNavigate();


    const createEmployee = async (body) => {
        const response = await postCreateEmployee(body);
        if (response.status === 201) {
            navigate('/admin/employee')
        };
    };

    return(
        <EmployeeFormCreate
            createEmployee={createEmployee}
        />
    )
};

export default EmployeeCreateContainer;