import { Link } from "react-router-dom";
import { Layout, Menu, Card, Statistic} from "antd";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { formatNumber } from '../../utils/numberFormat'

const { Sider } = Layout;
const { SubMenu } = Menu;

const Admin = ({ todayTotal, users, currentTime, ingresosAnuales }) => {

  const totalIngresos = ingresosAnuales.reduce(
    (total, ingreso) => total + ingreso.ingresos,
    0
  );
  return (
    <div className="admin-body">
      <Sider
        width={200}
        style={{
          height: "100%",
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub2"]} // Abre automáticamente el menú principal
          style={{ height: "100%", borderRight: 0 }}
        >
          <SubMenu key="sub2" title="MENÚ" style={{ color: "black" }}>
            <Menu.Item key="1">
              <Link to="/admin/inventory">Inventario</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/admin/expense">Gastos</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/admin/employee">Empleados</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/admin/client">Cliente</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/admin/citas">Citas</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/admin/product">Productos</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/admin/service">Servicios</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/admin/gain">Ingresos</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/admin/order">Ordenes</Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to="/admin/payment">Pagos en linea</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>

      <div style={{ width: '100vw', padding: '10px', flexWrap: 'wrap' }} >
        <div className= 'dashboardStadistics-wrapper' style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap'}}>
            <Card className="stadistics-card">
              <Statistic
                style={{ fontFamily: " GilRoy" }}
                title="Ingresos del dia"
                value={todayTotal}
                prefix="$"
              />
            </Card>
            <Card className="stadistics-card">
              <Statistic
                style={{ fontFamily: " GilRoy" }}
                title="Cantidad de usuarios registrados"
                value={users}
                precision={0}
              />
            </Card>
            <div
              style={{
                display: "flex",
                padding: "20px",
              }}
            >
              <Card>
                <Statistic
                  style={{ fontFamily: " GilRoy" }}
                  title="Hora Actual"
                  value={currentTime.format("HH:mm:ss")}
                />
              </Card>
            </div>
        </div>

        <div className="stadistics-gains-container">
          <h2>Total de Ingresos</h2>
          <p>{formatNumber(totalIngresos)} </p>
          <BarChart width={600} height={300} data={ingresosAnuales}>
            <XAxis dataKey="mes" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="ingresos" fill="#dc5fff" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Admin;
