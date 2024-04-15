import { Link } from "react-router-dom";
import { Table, Empty, Button, Typography } from "antd";
import { useSpring, animated } from "react-spring";

const PaymentAdmin = ({ payments }) => {

  const { Title } = Typography;

  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 400,
  });
  const columns = [
    {
      title: "Trasacción ID",
      dataIndex: "trasactionId",
      key: "trasactionId",
    },
    {
      title: "Orden ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Monto($)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Monto Neto",
      dataIndex: "amountNeto",
      key: "amountNeto",
    },
    {
      title: "Fecha de trasacción",
      dataIndex: "trasactionDate",
      key: "trasactionDate",
    },
  ];

  const paginationConfig = {
    pageSize: 6,
  };

  return (
    <animated.div style={fadeInProps} className="reusable-body">
      <Title style={{ fontFamily: "Poppins" }}>
        trasacciones en linea
      </Title>
      {payments?.length === 0 || !payments ? (
        <Empty description="No hay servicios registrados" />
      ) : (
        <div className="inventory-container">
          <Link className="create-container" to={"/service/create"}>
            <Button
              type="primary"
              icon={<i className="fa-solid fa-circle-plus"></i>}
            />
          </Link>
          <Table
            className="table-container"
            dataSource={payments}
            columns={columns}
            rowKey="orderId"
            pagination={paginationConfig}
          />
        </div>
      )}
    </animated.div>
  );
};

export default PaymentAdmin;
