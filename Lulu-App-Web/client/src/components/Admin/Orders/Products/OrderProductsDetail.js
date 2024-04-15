import { Table, Typography, Empty, Button, Tag } from 'antd';
import { useSpring, animated } from 'react-spring';

const OrderProductsDetail = ({ products }) => {

    const { Title } = Typography;

    const fadeInProps = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      delay: 500,
    });

    const columns = [
        {
          title: "Nombre de producto",
          dataIndex: "productName",
          key: "productName",
        },
        {
          title: "Cantidad",
          dataIndex: "quantity",
          key: "quantity",
          render: (text, record) => (
            text ? text : <Tag style={{ backgroundColor: 'violet', color: 'white', fontFamily: 'GilRoy, sans-serif' }} color="warning">No contiene</Tag>
          ),
        },
        {
          title: "Precio",
          dataIndex: "price",
          key: "price",
        },
        {
          title: "Stock",
          dataIndex: "stock",
          key: "stock",
        },
        {
          title: "Descuento",
          dataIndex: "discount",
          key: "discount",
        },
      ];

      const paginationConfig = {
        pageSize: 6,
      };

  return (
    <animated.div style={fadeInProps} className='reusable-body'>
        <Title style={{ fontFamily: 'Poppins' }}>Productos de orden</Title>
        {
        products?.length === 0 || !products ? (
            <Empty description="No hay inventario registrado" />
            ) : (
            <div className='inventory-container' style={{ justifyContent: 'center' }}>
                <Table className='table-container' dataSource={products} columns={columns}  pagination={paginationConfig} />
            </div>
        )
        }
  </animated.div>
  )
}

export default OrderProductsDetail
