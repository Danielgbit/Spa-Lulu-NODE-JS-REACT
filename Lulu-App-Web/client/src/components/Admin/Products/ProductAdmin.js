import { Link } from "react-router-dom";
import { Table, Empty, Button, Popconfirm, Typography } from "antd";
import { formatNumber } from "../../../utils/numberFormat";
import { useSpring, animated } from 'react-spring';


const ProductAdmin = ({ isLoadingProducts, products, destroyProduct }) => {

  const { Title } = Typography;
  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });

  const columns = [
    {
      title: "Nombre",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      render: (price) => formatNumber(price),
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
      render: (discount) => `${discount}%`,
    },
    {
      title: "Categoría",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      render: text => <span style={{ fontSize: '10px'}}>{text}</span>,
      width: '120px'
    },
    {
      title: "Acciones",
      key: "actions",
      render: (product) => (
        <>
          <Link className='table-actions-buttons' to={`/product/update/${product.productId}`}>
            <Button type="link" icon={<i className="fa-solid fa-pen-to-square"></i>} />
          </Link>
          <Popconfirm
            title="¿Estás seguro de eliminar este producto?"
            onConfirm={() => destroyProduct(product.productId)}
            okText="Sí"
            cancelText="No"
          >
            <Button className='table-actions-buttons' type="link" icon={<i className="fa-solid fa-trash" />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const paginationConfig = {
    pageSize: 4,
  };

  return (
    <animated.div style={fadeInProps}>
      <div className='reusable-body' style={{ height: '100vh' }}>
        <Title style={{ fontFamily: "Poppins" }}>Productos</Title>
        {products?.length === 0 || !products ? (
          <>
            <Empty description="No hay productos registrados" />
            <Link className='create-container' to="/product/create">
              <Button type="primary" icon={<i className="fa-solid fa-circle-plus"></i>} />
            </Link>
          </>
        ) : (
          <div className='inventory-container'>
            <Link className='create-container' to="/product/create">
              <Button type="primary" icon={<i className="fa-solid fa-circle-plus"></i>} />
            </Link>
            <Table className='table-container' dataSource={products} columns={columns} rowKey="productId" pagination={paginationConfig} />
          </div>
        )}
      </div>
    </animated.div>

  );
};

export default ProductAdmin;
