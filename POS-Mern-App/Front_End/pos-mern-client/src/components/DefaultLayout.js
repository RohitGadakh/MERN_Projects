//import React from 'react';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Homepage from "../pages/Homepage";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, theme } from "antd";
import { Children } from "react";
import { render } from "@testing-library/react";
import { rootReducer } from "./../redux/rootReducer";
import Spinner from "./Spinner";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();

  const { cartItems ,loading} = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  //to get local storage data

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <Layout>
      {loading && <Spinner/>}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div>
          <h2 style={{ color: "white", textAlign: "center", paddingTop: 10 }}>
            <i>POS</i>
          </h2>
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/items">Items</Link>
          </Menu.Item>
          <Menu.Item key="/customer" icon={<UserOutlined />}>
            <Link to="/customer">Customer</Link>
          </Menu.Item>
          <Menu.Item key="/logout" 
          icon={<LogoutOutlined />}
          onClick={()=>{
            localStorage.removeItem('auth')
            navigate('/login')
          }}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="cart-items">
            <p style={{ paddingRight: 30, fontSize: 20, cursor: "pointer" }}>
              {cartItems.length}
              <ShoppingCartOutlined  onClick={()=>{navigate('/cart')}}/>
             {/* <div  className="cart-items" onClick={()=>{navigate('/cart')}}>
              <ShoppingCartOutlined />
              </div> */}
            </p>
          </div>
        </Header>
      <div>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 250,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            
          }}
        >
          {/* Content */}
          {children}
        </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
