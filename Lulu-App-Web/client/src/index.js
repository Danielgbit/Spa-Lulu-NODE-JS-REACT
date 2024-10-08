import React from "react";
import ReactDOM from "react-dom/client";
import "./index.sass";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CartContextProvider from "./Context/CartContext";
import UserContextProvider from "./Context/UserContext";
import AdminContextProvider from "./Context/AdminContext";
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <UserContextProvider>
    <AdminContextProvider>
        <CartContextProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>,
        </CartContextProvider>
    </AdminContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
