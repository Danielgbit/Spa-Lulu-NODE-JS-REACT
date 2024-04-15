import { Table, Typography, Empty, Button, Tag, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { ShoppingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";



const ShopHistoryList = ({ shoppings }) => {

    const { Title } = Typography;

    const fadeInProps = useSpring({
      opacity: 1,
      from: { opacity: 30 },
      delay: 500,
    });

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
          render: (text, record) =>  text && (
            <Tag 
                    style={{
                        background: 'linear-gradient(294deg, rgb(184, 33, 255) 0%, rgb(240, 76, 255) 0%, rgb(224, 0, 213) 10%)',
                        color: "white",
                        fontFamily: "GilRoy, sans-serif",
                        textTransform: 'uppercase'
                    }}
                    color='gold'
                    >
                    {dayjs(text).format('MMMM/DD/YYYY')}
            </Tag>
          )
        },
        {
          title: "Estado",
          dataIndex: "status",
          key: "status",
          render: (text, record) => text === 'approved' ? 
            (<Tag 
                style={{
                    background: 'linear-gradient(294deg, rgb(184, 33, 255) 0%, rgb(240, 76, 255) 100%, rgb(224, 0, 213) 100%)',
                    color: "white",
                    fontFamily: "GilRoy, sans-serif",   
                }}
                color='gold'
                >
                APROBADO
            </Tag>) : (
                <Tag 
                style={{
                    background: '#5B0057',
                    color: "#F8E8FF",
                    fontFamily: "GilRoy, sans-serif",   
                }}
                color='red'
                >
                PENDIENTE
            </Tag>)
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
          title: "Detalle de compra",
          key: "actions",
          render: (text, record) => (
            <>
              <Link
                className="table-actions-buttons"
                to={`/profile/shop/detail/${record.orderId}`}
              >
                    <Tag
                        style={{
                            fontFamily: "Poppins, sans-serif",
                        }}
                        color="magenta"
                        
                    >
                        VER DETALLE
                    </Tag>
              </Link>
            </>
          ),
        },
      ];


      const paginationConfig = {
        pageSize: 6,
      };


  return (
    <animated.div style={fadeInProps} className="reusable-body">
        <div className="shoppingHistory-title-container">
            <ShoppingOutlined style={{ fontSize: '40px' }} />
            <Title style={{ fontFamily: "Poppins", padding: '0' }}>Compras</Title>
        </div>
      {shoppings?.length === 0 || !shoppings ? (
        <Empty description="No hay inventario registrado" />
      ) : (
        <div
          className="inventory-container"
          style={{ justifyContent: "center" }}
        >
          <Table
            className="table-container"
            dataSource={shoppings}
            columns={columns}
            rowKey="inventoryId"
            pagination={paginationConfig}
          />
        </div>
      )}
    </animated.div>
  )
}

export default ShopHistoryList