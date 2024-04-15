import { Table, Typography, Empty, Button, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const OrderDetail = ({ order }) => {

  const { Title } = Typography;

  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });


  const columns = [
    {
      title: "Primer nombre",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Segundo nombre",
      dataIndex: "middleName",
      key: "middleName",
      render: (text, record) => (
        text ? text : <Tag style={{ backgroundColor: 'violet', color: 'white', fontFamily: 'GilRoy, sans-serif' }} color="warning">No contiene</Tag>
      ),
    },
    {
      title: "Apellido",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Telefono",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ciudad",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Barrio",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Dirección",
      dataIndex: "address",
      key: "address",
    },
    {
        title: 'Detalle Productos',
        key: 'viewProducts',
        render: (text, record) => (
          <Link style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'violet' }} to={`/order/products/detail/${record.orderId}`}>Ver productos
            <Button
              type="link"
              icon={<i class="fa-brands fa-product-hunt"></i>}
            />
          </Link>
        ),
      }
  ];

  const paginationConfig = {
    pageSize: 6,
  };

  return (
    <animated.div style={fadeInProps} className='reusable-body'>
        <Title style={{ fontFamily: 'Poppins' }}>Detalle de orden</Title>
        {
        order?.length === 0 || !order ? (
            <Empty description="No hay inventario registrado" />
            ) : (
            <div className='inventory-container' style={{ justifyContent: 'center' }}>
                <Table className='table-container' dataSource={order} columns={columns} rowKey="orderId" pagination={paginationConfig} />
            </div>
        )
        }
  </animated.div>
  );
};

export default OrderDetail;
