import { Empty, Typography, Table, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../utils/numberFormat";
import { useEffect, useState } from "react";
import { useSpring, animated } from 'react-spring';


const ExpenseAdmin = ({ expenses, isLoading, onClickDestroy }) => {
  const { Title } = Typography;
  const [total, setTotal] = useState(0);

  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });

  const _onClickDestroy = (id) => {
    onClickDestroy(id);
  };

  function totalProfits() {
    if (expenses.length > 0) {
      const total = expenses.reduce((accum, current) => {
        return accum + current.quantity;
      }, 0);
      setTotal(total);
    }
  }

  useEffect(() => {
    totalProfits();
  }, [expenses]);

  const columns = [
    {
      title: "Categoría",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Método de Pago",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => `- ${formatNumber(quantity)}`,
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Fecha",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (expense) => (
        <>
          <Link
            className="table-actions-buttons"
            to={`/expense/update/${expense.expenseId}`}
          >
            <Button
              type="link"
              icon={<i className="fa-solid fa-pen-to-square"></i>}
            />
          </Link>
          <Popconfirm
            title="¿Estás seguro de eliminar este gasto?"
            onConfirm={() => _onClickDestroy(expense.expenseId)}
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
    <animated.div style={fadeInProps}>
    <div className="reusable-body">
      <Title style={{ fontFamily: "Poppins" }}>Gastos</Title>
      {expenses?.length === 0 || !expenses ? (
        <Empty description="No hay gastos registrados" />
      ) : (
        <>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Poppins",
              fontSize: "1rem",
              color: "black",
              backgroundColor: "#eec9ff",
              padding: "0 10px",
              borderRadius: "5px",
              boxShadow: "4px 5px 11px -5px rgba(0,0,0,0.75)",
            }}
          >
            - {formatNumber(total)}
          </span>
          <div className="inventory-container">
            <Link className="create-container" to={`/expense/create`}>
              <Button
                type="primary"
                icon={<i className="fa-solid fa-circle-plus"></i>}
              />
            </Link>
            <Table
              className="table-container"
              dataSource={expenses}
              columns={columns}
              rowKey="expenseId"
              pagination={paginationConfig}
            />
          </div>
        </>
      )}
    </div>
    </animated.div>

  );
};

export default ExpenseAdmin;
