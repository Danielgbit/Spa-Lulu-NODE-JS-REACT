import { Link } from "react-router-dom";
import {
  Table,
  Button,
  Popconfirm,
  Empty,
  Typography,
  Tag,
  DatePicker,
} from "antd";
import dayjs from "dayjs";

const ClientAdmin = ({ clients, destroyClient, handleFilter, loadClients }) => {
  const { Title } = Typography;

  /*     const fadeInProps = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      delay: 500,
    }); */

  const onClickDestroyClient = (id) => {
    destroyClient(id);
  };

  const onChangeDate = (value) => {
    handleFilter(value?.$d);
  };

  const onClickCleanFilter = () => {
    loadClients();
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Número",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Fecha de nacimiento",
      dataIndex: "birthDate",
      key: "birthDate",
      render: (birthDate) => (
        <div
          style={{
            fontWeight: "bold",
            fontFamily: "Poppins",
            textTransform: "uppercase",
          }}
        >
          {birthDate?.length > 0 ? (
            dayjs(birthDate).format("DD/MMMM/YYYY")
          ) : (
            <Tag color="purple">no contiene</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (client) => (
        <>
          <Link to={`/client/update/${client.clientId}`}>
            <Button
              className="table-actions-buttons"
              type="link"
              icon={<i className="fa-solid fa-pen-to-square"></i>}
            />
          </Link>
          <Popconfirm
            title="¿Estás seguro de eliminar este cliente?"
            onConfirm={() => onClickDestroyClient(client.clientId)}
            okText="Sí"
            cancelText="No"
          >
            <Button
              className="table-actions-buttons"
              type="link"
              icon={<i className="fa-solid fa-trash" />}
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  const paginationConfig = {
    pageSize: 6,
  };

  return (
    <div className="reusable-body" style={{ height: "100%" }}>
      <Title style={{ fontFamily: "Poppins" }}>Clientes</Title>
      {clients?.length === 0 || !clients ? (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '50px'}}>
          <div className="filter-container" style={{ width: '50%', justifyContent: 'center' }}>
            <Button
              className="filter-button"
              style={{ fontSize: "11px" }}
              type="submit"
              onClick={onClickCleanFilter}
            >
              <i class="fa-solid fa-filter-circle-xmark"></i> Limpiar filtro
            </Button>
          </div>

          <Empty description="No hay clientes registrados" />

        </div>
      ) : (
        <div
          className="inventory-container"
          style={{ flexDirection: "column", alignItems: "center", gap: "50px" }}
        >
          {/* FILTER */}
          <div
            className="filter-container"
            style={{ width: "30%", alignItems: "center" }}
          >
            <Button
              className="filter-button"
              style={{ fontSize: "11px" }}
              type="submit"
              onClick={onClickCleanFilter}
            >
              <i class="fa-solid fa-filter-circle-xmark"></i> Limpiar filtro
            </Button>
            <DatePicker
              placeholder="Filtra por cumpleaños"
              className="custom-datePicker"
              onChange={onChangeDate}
            />
            <div className="filter-button-container"></div>

            <div className="filter-content-wrapper"></div>
          </div>
          <div style={{ display: "flex", width: "100%" }}>
            <Link className="create-container" to="/client/create">
              <Button
                type="primary"
                icon={<i className="fa-solid fa-circle-plus"></i>}
              />
            </Link>
            <Table
              className="table-container"
              dataSource={clients}
              columns={columns}
              rowKey="clientId"
              pagination={paginationConfig}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientAdmin;
