import { Table, Typography, Empty, Button, Tag, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { deleteOrder } from "../../../services/OrderService";
import { toast, ToastContainer } from "react-toastify";

const OrderAdmin = ({ orders, loadOrders }) => {
  const { Title } = Typography;

  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });

  const onClickDestroy = async (id) => {
    const res = await deleteOrder(id);
    if (res?.status === 200) {
      loadOrders();
      toast.success("¡Order eliminada exitosamente!");
    }
  };

  const columns = [
    {
      title: "Orden ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Fecha",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Metodo de pago",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Correo de pago",
      dataIndex: "paymentEmail",
      key: "paymentEmail",
      render: (text, record) =>
        text ? (
          text
        ) : (
          <Tag
            style={{
              backgroundColor: "violet",
              color: "white",
              fontFamily: "GilRoy, sans-serif",
            }}
            color="warning"
          >
            No contiene
          </Tag>
        ),
    },
    {
      title: "Telefono de pago",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text, record) =>
        text ? (
          text
        ) : (
          <Tag
            style={{
              backgroundColor: "violet",
              color: "white",
              fontFamily: "GilRoy, sans-serif",
            }}
            color="warning"
          >
            No contiene
          </Tag>
        ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => (
        <>
          <Link
            className="table-actions-buttons"
            to={`/order/detail/${record.orderId}`}
          >
            <Button type="link" icon={<i class="fa-solid fa-info"></i>} />
          </Link>
          <Popconfirm
            title="¿Estas seguro de eliminar la order?"
            onConfirm={() => onClickDestroy(record.orderId)}
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
    <animated.div style={fadeInProps} className="reusable-body">
      <Title style={{ fontFamily: "Poppins" }}>Ordenes</Title>
      {orders?.length === 0 || !orders ? (
        <Empty description="No hay inventario registrado" />
      ) : (
        <div
          className="inventory-container"
          style={{ justifyContent: "center" }}
        >
          <ToastContainer />
          <Table
            className="table-container"
            dataSource={orders}
            columns={columns}
            rowKey="inventoryId"
            pagination={paginationConfig}
          />
        </div>
      )}
    </animated.div>
  );
};

export default OrderAdmin;
