import { useParams } from "react-router-dom"
import { getOrderProducts } from "../../../../services/OrderService"
import { useEffect, useState } from "react";
import { Table, Typography, Empty, Button, Tag } from 'antd';
import { useSpring, animated } from 'react-spring';
import { formatNumber } from '../../../../utils/numberFormat';


const ShopProductsDetail = () => {

    const { id } = useParams();
    const [ products, setProducts ] = useState([]);

    const loadShoppingProducts = async () => {
        if (id?.toString().length > 0) {
            const res = await getOrderProducts(id);
            if(res?.status === 200) { setProducts(res.data.orderProducts); };
        }
    };

    useEffect(() => {
        loadShoppingProducts();
    }, [id]);

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
        render: (text, record) => formatNumber(text)
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
        render: (text, record) => text === 0 ? (
          <Tag
            style={{ fontFamily: 'Poppins' }}
            color="purple"
          >
          No contiene  
          </Tag>
        ): (
          <Tag
            style={{ fontFamily: 'Poppins', letterSpacing: '1px' }}
            color="purple"
          >
          {text} %  
          </Tag>
        )
      },
    ];


    const paginationConfig = {
      pageSize: 6,
    };

  return (
    <animated.div style={fadeInProps} className='reusable-body'>
        <Title style={{ fontFamily: 'Poppins' }}>Productos de compra</Title>
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

export default ShopProductsDetail
