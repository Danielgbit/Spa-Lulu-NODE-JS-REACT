import React from 'react';
import { Table, Typography, Empty, Button, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';


const { Title } = Typography;

function InventoryAdmin({ items, formatNumber, deleteItem }) {
  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });

  const onClickDestroy = (id) => {
    deleteItem(id);
  };

  function formatNumber(number) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
    }).format(number);
  };



  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Proveedor',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Vencimiento',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
    },
    {
      title: 'Categoría',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      render: (price) => formatNumber(price),
    },
    {
      title: 'Precio venta',
      dataIndex: 'salePrice',
      key: 'salePrice',
      render: (salePrice) => formatNumber(salePrice),
    },
    {
      title: 'Ganancia',
      dataIndex: 'profit',
      key: 'profit',
      render: (text, record) => (
        <Tag
          color='purple'
          style={{ 
            fontSize: '13px',
            fontFamily: 'GilRoy',
            fontWeight: '800'
          }}
        >
          {formatNumber(record.salePrice - record.price)}
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <>
          <Link className='table-actions-buttons' to={`/inventory/update/${record.inventoryId}`}>
            <Button type="link" icon={<i className="fa-solid fa-pen-to-square"></i>} />
          </Link>
          <Button className='table-actions-buttons' type="link" icon={<i className="fa-solid fa-trash" />} onClick={() => onClickDestroy(record.inventoryId)} />
        </>
      ),
    },
  ];

  const paginationConfig = {
    pageSize: 6,
  };

  return (
    <animated.div style={fadeInProps} className='reusable-body'>
      <Title style={{ fontFamily: 'Poppins' }}>Inventario</Title>
      {
      items?.length === 0 || !items ? (
            <>
              <Empty description="No hay inventario registrado" />
              <div className='inventory-container' style={{ justifyContent: 'center' }}>
                <Link className='create-container' to="/inventory/create">
                  <Button type="primary" icon={<i className="fa-solid fa-circle-plus"></i>} />
                </Link>
              </div>

            </>
            
            ) : (
            <div className='inventory-container'>
              <Link className='create-container' to="/inventory/create">
                <Button type="primary" icon={<i className="fa-solid fa-circle-plus"></i>} />
              </Link>
              <Table className='table-container' dataSource={items} columns={columns} rowKey="inventoryId" pagination={paginationConfig} />
          </div>
        )
      }
    </animated.div>
  );
}

export default InventoryAdmin;
