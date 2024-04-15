import EmployeeAdmin from "./EmployeeAdmin";
import {
  getEmployees,
  deleteEmployee,
} from "../../../services/EmployeeService";
import { useEffect, useState } from "react";
import { Spinner } from '@chakra-ui/react';


const EmployeeAdminContainer = () => {
  const [employees, setEmployees] = useState([] || null);
  const [isLoadingEmployee, setisLoadingEmployee] = useState(true);

  const loadEmployees = async () => {
    const response = await getEmployees();
    if (response?.status === 200) {
      setEmployees(response.data.allEmployees);
    }

    if (response?.status === 400) {
      setEmployees([] || null);
    }

    setisLoadingEmployee(false);
  };

  const destroyEmployee = async (id) => {
    const response = await deleteEmployee(id);
    if (response?.status === 200) {
      await loadEmployees();
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <>
      {isLoadingEmployee ? (
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
        <EmployeeAdmin
          employees={employees}
          destroyEmployee={destroyEmployee}
        />
      )}
    </>
  );
};

export default EmployeeAdminContainer;
