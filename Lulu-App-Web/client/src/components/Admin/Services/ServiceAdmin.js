import { Link } from "react-router-dom";
import { Table, Empty, Button, Typography } from "antd";
import { useSpring, animated } from 'react-spring';
import { formatNumber} from '../../../utils/numberFormat';


const ServiceAdmin = ({ services, destroyService }) => {

  const { Title } = Typography;

  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 400,
  });

  const onClickDestroyService = (id) => {
    destroyService(id);
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      render: (price) => formatNumber(price),
    },
    {
      title: "Duración (minutos)",
      dataIndex: "durationMinutes",
      key: "durationMinutes",
    },
    {
      title: "Categoría",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => (
        <>
          <Link className='table-actions-buttons' to={`/service/update/${record.serviceId}`}>
            <Button type="link" icon={<i className="fa-solid fa-pen-to-square"></i>} />
          </Link>
          <Button
            className='table-actions-buttons'
            type="link"
            icon={<i className="fa-solid fa-trash" />}
            onClick={() => onClickDestroyService(record.serviceId)}>
          </Button>
        </>
      ),
    },
  ];

  const paginationConfig = {
    pageSize: 6,
  };

  return (
    <animated.div style={fadeInProps} className='reusable-body'>
      <Title style={{ fontFamily: 'Poppins' }}>Listado de servicios</Title>
      {services?.length === 0 || !services ? (
        <Empty description="No hay servicios registrados" />
      ) : (
        <div className='inventory-container'>
          <Link className='create-container' to={"/service/create"}>
            <Button type="primary" icon={<i className="fa-solid fa-circle-plus"></i>} />
          </Link>
          <Table className='table-container' dataSource={services} columns={columns} rowKey="serviceId" pagination={paginationConfig} />
        </div>
      )}
  </animated.div>
  );
};

export default ServiceAdmin;