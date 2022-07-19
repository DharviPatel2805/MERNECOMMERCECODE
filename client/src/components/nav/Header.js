import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  TeamOutlined,
  RightCircleOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
  LogoutOutlined,
  LockOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";
// import firebase from "firebase/compat/app";
import { getAuth, signOut } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import Search from "../forms/Search";

const Header = () => {
  const [current, setCurrent] = useState("home");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const logout = () => {
    // firebase.auth.signOut();
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="headerdiv">
      <Menu
        onClick={handleClick}
        mode="horizontal"
        selectedKeys={[current]}
        className="bg-warning"
      >
        {user && user.role !== "admin" && (
          <Menu.Item
            key="home"
            icon={<AppstoreOutlined className="text-dark" />}
          >
            <Link to="/" className="text-dark">
              Home
            </Link>
          </Menu.Item>
        )}

        {user && user.role !== "admin" && (
          <Menu.Item
            key="shop"
            icon={<ShoppingOutlined className="text-dark" />}
          >
            <Link to="/shop" className="text-dark">
              Shop
            </Link>
          </Menu.Item>
        )}

        {user && user.role !== "admin" && (
          <Menu.Item
            key="cart"
            icon={<ShoppingCartOutlined className="text-dark" />}
          >
            <Link to="/cart" className="text-dark">
              <Badge count={cart.length} offset={[9, 0]}>
                Cart
              </Badge>
            </Link>
          </Menu.Item>
        )}

        {user && user.role !== "admin" && (
          <Menu.Item
            key="wishlist"
            icon={<HeartOutlined className="text-dark" />}
          >
            <Link to="/user/wishlist" className="text-dark">
              Wishlist
            </Link>
          </Menu.Item>
        )}

        {user && user.role !== "admin" && (
          <span className="float-right">
            <Search />
          </span>
        )}

        {!user && (
          <Menu.Item
            key="register"
            icon={<UserAddOutlined className="text-dark" />}
            className="ml-auto"
          >
            <Link to="/register" className="text-dark">
              Register
            </Link>
          </Menu.Item>
        )}

        {!user && (
          <Menu.Item key="login" icon={<UserOutlined className="text-dark" />}>
            <Link to="/login" className="text-dark">
              Login
            </Link>
          </Menu.Item>
        )}

        {user && (
          <Menu.SubMenu
            key="SubMenu"
            title={user.email && user.email.split("@")[0]}
            icon={<SettingOutlined />}
            className="ml-auto"
          >
            {user && user.role === "subscriber" && (
              <Menu.Item key="one" icon={<RightCircleOutlined />}>
                <Link to="/user/history" className="text-dark">
                  Dashboard
                </Link>
              </Menu.Item>
            )}

            {user && user.role === "admin" && (
              <Menu.Item key="one" icon={<TeamOutlined />}>
                <Link to="/admin/main-dashboard" className="text-dark">
                  Dashboard
                </Link>
              </Menu.Item>
            )}

            <Menu.Item key="password" icon={<LockOutlined />}>
              <Link to="/password" className="text-dark">
                Update Password
              </Link>
            </Menu.Item>

            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Menu.Item>
            
          </Menu.SubMenu>
        )}
      </Menu>
    </div>
  );
};

export default Header;

// import React, { useState } from 'react';
// import {AppstoreOutlined, SettingOutlined , UserAddOutlined, UserOutlined} from '@ant-design/icons';
// import { Menu } from 'antd';
// import { Link } from 'react-router-dom';

// const items = [
//   {
//     label: 'Home',
//     key: 'home',
//     icon: <AppstoreOutlined />,
//     className:"alert alert-primary"
//   },
//   {
//     label: 'Login',
//     key: 'login',
//     icon: <UserOutlined />,
//     className:"alert alert-primary"
//   },
//   {
//     label: 'Register',
//     key: 'register',
//     icon: <UserAddOutlined />,
//     className:"alert alert-primary"
//   },
//   {
//     label: 'Username',
//     key: 'SubMenu',
//     icon: <SettingOutlined />,
//     children: [
//       {
//         type: 'group',
//         label: 'Item 1',
//         children: [
//           {
//             label: 'Option 1',
//             key: 'setting:1',
//           },
//           {
//             label: 'Option 2',
//             key: 'setting:2',
//           },
//         ],
//       },

//     ],
//   },

// ];

// const Header = () => {
//   const [current, setCurrent] = useState('mail');

//   const onClick = (e) => {
//     console.log('click ', e);
//     setCurrent(e.key);
//   };

//   return
//   <Link to={current}>
//   <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
//   </Link>
// };

// export default Header;
