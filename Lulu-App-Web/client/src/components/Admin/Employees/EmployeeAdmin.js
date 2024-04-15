import { Link } from "react-router-dom";
import { Table, Empty, Button, Typography } from "antd";
import { useSpring, animated } from "react-spring";

const EmployeeAdmin = ({ employees, destroyEmployee }) => {
  const { Title } = Typography;

  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 400,
  });

  const onClickDestroy = (id) => {
    destroyEmployee(id);
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Posición",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Teléfono",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Biografía",
      dataIndex: "biography",
      key: "biography",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => (
        <>
          <Link
            className="table-actions-buttons"
            to={`/employee/update/${record.employeeId}`}
          >
            <Button
              type="link"
              icon={<i className="fa-solid fa-pen-to-square"></i>}
            />
          </Link>
          <Button
            className="table-actions-buttons"
            type="link"
            icon={<i className="fa-solid fa-trash" />}
            onClick={() => onClickDestroy(record.employeeId)}
          ></Button>
        </>
      ),
    },
  ];

  return (
    <>
      <animated.div style={fadeInProps} className="reusable-body">
        <Title style={{ fontFamily: "Poppins" }}>Empleados</Title>
        {employees.length === 0 || !employees ? (
          <Empty description="No hay servicios registrados" />
        ) : (
          <div className="inventory-container">
            <Link className="create-container" to={`/employee/create`}>
              <Button
                type="primary"
                icon={<i className="fa-solid fa-circle-plus"></i>}
              />
            </Link>
            <Table
              className="table-container"
              dataSource={employees}
              columns={columns}
              rowKey="employeeId"
            />
          </div>
        )}
      </animated.div>
    </>
  );
};

export default EmployeeAdmin;
