import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookingPageComponent from "./pages/Bookings/BookingPageComponent";

import NavBarComponent from "./partials/NavBar/NavBar";

import LoginContainer from "./components/Login/LoginContainer";

import HomeContainer from "./pages/Home/HomeContainer";

import CartContainer from "./components/Cart/CartContainer";

import ProductContainer from "./pages/Products/ProductContainer";
import ProductDetailContainer from "./components/Products/Detail/ProductDetailContainer";
import ProductsFilteredContainer from "./components/Products/List/ProductsFilteredContainer";

import AllServices from "./pages/Service/AllServices";
import ServiceDetailContainer from "./components/Services/Detail/ServiceDetailContainer";
import ServiceListContainer from "./components/Services/List/ServiceListContainer";

import AdminContainer from "./pages/DashBoard/AdminContainer";

import AppointmentAdminContainer from "./components/Admin/Appointments/AppointmentAdminContainer";
import AppointCreateContainer from "./components/Appointments/Create/AppointFormContainer";
import AppointUpdateContainer from "./components/Appointments/Update/UpdateAppointmentContainer";

import ProductCreateContainer from "./components/Products/Create/ProductCreateContainer";
import ProductAdminContainer from "./components/Admin/Products/ProductAdminContainer";
import ProductUpdateContainer from "./components/Products/Update/ProductUpdateContainer";

import ServiceAdminContainer from "./components/Admin/Services/ServiceAdminContainer";
import ServiceCreateContainer from "./components/Services/Create/ServiceCreateContainer";
import ServiceUpdateContainer from "./components/Services/Update/ServiceUpdateContainer";

import ClientAdminContainer from "./components/Admin/Clients/ClientAdminContainer";
import ClientCreateContainer from "./components/Client/Create/ClientCreateContainer";
import ClientUpdateContainer from "./components/Client/Update/ClientUpdateContainer";

import EmployeeCreateContainer from "./components/Employee/Create/EmployeeCreateContainer";
import EmployeeAdminContainer from "./components/Admin/Employees/EmployeeAdminContainer";
import AppointCalendarContainer from "./components/Appointments/Calendar/AppointCalendarContainer";
import EmployeeUpdateContainer from "./components/Employee/Update/EmployeeUpdateContainer";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import AdminLoginContainer from "./components/Admin/Access/AdminLoginContainer";
import ProtectedRouteAdmin from "./components/Protected/ProtectedRouteAdmin";
import ProfileContainer from "./components/User/ProfileContainer";
import InventoryAdminContainer from "./components/Admin/Inventory/InventoryAdminContainer";
import InventoryCreateContainer from "./components/Admin/Inventory/Crud/Create/InventoryCreateContainer";
import InventoryUpdateContainer from "./components/Admin/Inventory/Crud/Update/InventoryUpdateContainer";
import GainAdminContainer from "./components/Admin/Gains/GainAdminContainer";
import GainCreateContainer from "./components/Admin/Gains/Crud/Create/GainCreateContainer";
import GainUpdateContainer from "./components/Admin/Gains/Crud/Update/GainUpdateContainer";
import ExpenseAdminContainer from "./components/Admin/Expenses/ExpenseAdminContainer";
import ExpenseUpdateContainer from "./components/Admin/Expenses/Crud/Update/ExpenseUpdateContainer";
import ExpenseCreateContainer from "./components/Admin/Expenses/Crud/Create/ExpenseCreateContainer";
import ProfileUpdateContainer from "./components/User/Crud/ProfileUpdateContainer";
import PasswordUpdateContainer from "./components/User/Crud/PasswordUpdate/PasswordUpdateContainer";


import DeleteUserContainer from "./components/User/Crud/DeleteUserAuth/DeleteUserContainer";
import RegisterFormContainer from "./components/Register/RegisterFormContainer";

//LIBRARIES
import 'react-toastify/dist/ReactToastify.min.css';
import 'antd/dist/antd';
import OrderAdminContainer from "./components/Admin/Orders/OrderAdminContainer";
import OrderCreateContainer from "./components/Admin/Orders/Crud/Create/OrderCreateContainer";
import OrderUpdateContainer from "./components/Admin/Orders/Crud/Update/OrderUpdateContainer";
import { OrderDetailContainer } from "./components/Admin/Orders/Detail/OrderDetailContainer";
import OrderProductsContainer from "./components/Admin/Orders/Products/OrderProductsContainer";
import PaymentAdminContainer from "./components/Admin/Payment/PaymentAdminContainer";
import ShopHistoryContainer from "./components/User/Shop/ShopHistoryContainer";
import ShopHistoryDetail from "./components/User/Shop/Detail/ShopHistoryDetail";
import ShopProductsDetail from "./components/User/Shop/Detail/ShopProductsDetail";


function App() {
  return (
    <div className="app">
      <BrowserRouter>
          <div style={{ marginBottom: '60px' }}>
            <NavBarComponent />
          </div>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
{/*           <Route path="/services" element={<AllServices />} />
          <Route path="/service/:id/detail" element={<ServiceDetailContainer />}/> */}
          <Route path="/services/category/:id" element={<ServiceListContainer />}/>
          <Route path="/products" element={<ProductContainer />} />
          <Route path="/products/category/:id" element={<ProductsFilteredContainer />}/>
          <Route path="/product/:id/detail" element={<ProductDetailContainer />}/>
          <Route path="/reservas" element={<BookingPageComponent />} />
          <Route path="/ingreso" element={<LoginContainer />} />
          <Route path="/register" element={<RegisterFormContainer />} />


          <Route path="/admin/login" element={<AdminLoginContainer />} />
        
        <Route element={<ProtectedRouteAdmin/>}>
          <Route path="/admin" element={<AdminContainer />} />
          <Route path="/admin/citas" element={<AppointmentAdminContainer />} />

          <Route path="/admin/client" element={<ClientAdminContainer />} />
          <Route path="/client/create" element={<ClientCreateContainer />} />
          <Route path="/client/update/:id" element={<ClientUpdateContainer />} />

          <Route path="/admin/product" element={<ProductAdminContainer />} />
          <Route path="/product/create" element={<ProductCreateContainer />} />
          <Route path="/product/update/:id" element={<ProductUpdateContainer />} />

          <Route path="/admin/service" element={<ServiceAdminContainer />} />
          <Route path="/service/create" element={<ServiceCreateContainer />} />
          <Route path="/service/update/:id" element={<ServiceUpdateContainer />} />

          <Route path="/admin/employee" element={<EmployeeAdminContainer />} />
          <Route path="/employee/create" element={<EmployeeCreateContainer />} />
          <Route path="/employee/update/:id" element={<EmployeeUpdateContainer />} />

          <Route path="/appointment/create" element={<AppointCreateContainer />} />
          <Route path="/appointment/update/:id" element={<AppointUpdateContainer />} />
          <Route path="/appointment/calendar/:id" element={<AppointCalendarContainer />} />

          <Route path="/admin/inventory" element={<InventoryAdminContainer />} />
          <Route path="/inventory/create" element={<InventoryCreateContainer />} />
          <Route path="/inventory/update/:id" element={<InventoryUpdateContainer />} />

          <Route path="/admin/gain" element={<GainAdminContainer />} />
          <Route path="/gain/create" element={<GainCreateContainer />} />
          <Route path="/gain/update/:id" element={<GainUpdateContainer />} />

          <Route path="/admin/expense" element={<ExpenseAdminContainer />} />
          <Route path="/expense/create" element={<ExpenseCreateContainer />} />
          <Route path="/expense/update/:id" element={<ExpenseUpdateContainer />} />

          <Route path="/admin/order" element={<OrderAdminContainer />} />
          <Route path="/order/create" element={<OrderCreateContainer />} />
          <Route path="/order/update/:id" element={<OrderUpdateContainer />} />
          <Route path="/order/detail/:id" element={<OrderDetailContainer />} />
          <Route path="/order/products/detail/:id" element={<OrderProductsContainer />} />

          <Route path="/admin/payment" element={<PaymentAdminContainer />} />

          
        </Route>

        <Route element={<ProtectedRoute/>} >
          <Route path="/cart" element={<CartContainer />} />
          <Route path="/profile" element={<ProfileContainer />} />
          <Route path="/profile/update" element={<ProfileUpdateContainer />} />
          <Route path="/profile/update/password" element={<PasswordUpdateContainer />} />
          <Route path="/profile/delete" element={<DeleteUserContainer />} />
          <Route path="/profile/shop/history/:id" element={<ShopHistoryContainer />} />
          <Route path="/profile/shop/detail/:id" element={<ShopHistoryDetail />} />
          <Route path="/profile/shop/detail/products/:id" element={<ShopProductsDetail />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
