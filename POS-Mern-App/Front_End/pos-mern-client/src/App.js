import "./App.css";
//import "antd/dist/antd.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ItemPage from "./pages/ItemPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import ItemList from './components/ItemList';
import { children } from "react";
import BillsPage from "./pages/BillsPage";

import CustomerPage from './pages/CustomerPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/items"
            element={
              <ProtectedRoute>
                <ItemPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/bills"
            element={
              <ProtectedRoute>
                <BillsPage />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/customer"
            element={
              <ProtectedRoute>
                <CustomerPage/>
              </ProtectedRoute>
            }
          ></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
