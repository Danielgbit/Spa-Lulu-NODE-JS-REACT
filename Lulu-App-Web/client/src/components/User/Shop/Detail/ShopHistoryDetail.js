import React, { useEffect, useState } from 'react'
import { Table, Typography, Empty, Button, Tag } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { getOrderDetail } from '../../../../services/OrderService';


const ShopHistoryDetail = () => {

    const { id } = useParams();
    const [ order, setOrder ] = useState([]);

    const loadShoppingDetail = async () => {
        if (id?.toString().length > 0) {
            const res = await getOrderDetail(id);
            if(res.status === 200) { setOrder(res.data.orderDetail); };
        }
    };

    useEffect(() => {
        loadShoppingDetail();
    }, [id]);

    const { Title } = Typography;
  
    const fadeInProps = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      delay: 200,
    });

    const columns = [
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
              <Link style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'violet' }} to={`/profile/shop/detail/products/${record.orderId}`}>
                <Tag
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    color='purple'
                >
                    VER PRODUCTOS
                </Tag>
              </Link>
            ),
          }
      ];
    
      const paginationConfig = {
        pageSize: 6,
      };




  return (
    <animated.div style={fadeInProps} className='reusable-body'>
    <Title style={{ fontFamily: 'Poppins' }}>Detalle de compra</Title>
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
  )
}

export default ShopHistoryDetail