// import React from "react";
// import { Link } from "react-router-dom";

// function AdminNav() {
//   return (
//     <nav className=" mt-4">
//       <ul className="nav flex-column">
//         <li className="nav-item  display-5 " style={{ borderRadius: "6px"}} >
//           <Link to="/admin/main-dashboard" className="nav-link text-dark  h4 font-weight-bold" >
//             Dashboard
//           </Link>
//         </li>

//         <li className="nav-item ">
//           <Link to="/admin/dashboard" className="nav-link  h4  font-weight-bold">
//             Orders
//           </Link>
//         </li>

//         <li className="nav-item ">
//           <Link to="/admin/product" className="nav-link  h4  font-weight-bold">
//             Product
//           </Link>
//         </li>

//         <li className="nav-item  ">
//           <Link to="/admin/products" className="nav-link  h4 font-weight-bold">
//             Products
//           </Link>
//         </li>

//         <li className="nav-item">
//           <Link to="/admin/category" className="nav-link  h4 font-weight-bold">
//             Category
//           </Link>
//         </li>

//         <li className="nav-item  ">
//           <Link to="/admin/sub" className="nav-link  h4 font-weight-bold">
//             Sub Category
//           </Link>
//         </li>

//         <li className="nav-item  ">
//           <Link to="/admin/coupon" className="nav-link  h4 font-weight-bold">
//             Coupon
//           </Link>
//         </li>

//         <li className="nav-item  ">
//           <Link to="/admin/content" className="nav-link  h4 font-weight-bold">
//             Dynamic Content
//           </Link>
//         </li>

//         <li className="nav-item  ">
//           <Link to="/admin/users" className="nav-link  h4 font-weight-bold">
//             Users
//           </Link>
//         </li>

//         <li className="nav-item  ">
//           <Link to="/password" className="nav-link  h4 font-weight-bold">
//             Password Update
//           </Link>
//         </li>

//       </ul>
//     </nav>
//   );
// }

// export default AdminNav;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaTh,
  FaBars,
  FaUserCog,
  FaList,
  FaShoppingCart,
} from "react-icons/fa";
import { SiShopware } from 'react-icons/si';
import { AiOutlineApartment } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { TbDiscount2 } from "react-icons/tb";
import { BsPencilSquare } from "react-icons/bs";
import { IoBagAdd } from "react-icons/io5";

import { NavLink } from "react-router-dom";

const Adminnav = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { sidebar } = useSelector((state) => ({ ...state }));

  const toggle = () => {
    setIsOpen(!isOpen);
    dispatch({
      type: "SET_SIDEBAR",
      payload: !sidebar,
    })
  }

  const menuItem = [
    {
      path: "/admin/main-dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/admin/dashboard",
      name: "Orders",
      icon: <FaShoppingCart />,
    },
    {
      path: "/admin/users",
      name: "Users",
      icon: <FaUserCog />,
    },
    {
      path: "/admin/product",
      name: "Product",
      icon: <IoBagAdd />,
    },
    {
      path: "/admin/products",
      name: "Product List",
      icon: <FaList />,
    },
    {
      path: "/admin/category",
      name: "Category",
      icon: <BiCategory />,
    },
    {
      path: "/admin/sub",
      name: "Sub Category",
      icon: <AiOutlineApartment />,
    },
    {
      path: "/admin/content",
      name: "Dynamic Content",
      icon: <BsPencilSquare />,
    },
    {
      path: "/admin/coupon",
      name: "Coupon",
      icon: <TbDiscount2 />,
    },
    
    
  ];
  return (
    <div className="container fixed">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo mb-0">
            <SiShopware/><span className="h6 text-center" >EShoppy</span> 
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Adminnav;
