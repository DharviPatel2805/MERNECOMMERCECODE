import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminNav from "../../components/nav/Adminnav";

import { listAllOrders } from "../../functions/admin";
import {
  DeliveredProcedureOutlined,
  ScheduleOutlined,
  CreditCardOutlined,
  MoneyCollectOutlined,
  SmileOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { FaRegChartBar, FaShoppingCart } from "react-icons/fa";

import { FaBoxOpen, FaUserAlt } from "react-icons/fa";

import { listUsers } from "../../functions/auth";
import { getProductByCount } from "../../functions/product";
import AdminAnalytics from "./AdminAnalytics";

function AdminMainDashboard() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllOrders();
    loadAllUsers();
    loadAllProducts();
  }, []);

  const loadAllOrders = () =>
    listAllOrders(user.token).then((res) => {
      //   console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const loadAllUsers = () =>
    listUsers().then((res) => {
      setUsers(res.data);
    });

  const loadAllProducts = () => {
    getProductByCount(100)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const total = useMemo(() => {
    return orders.reduce((sum, order, index) => {
      return sum + order.paymentIntent.amount;
    }, 0);
  }, [orders]);

  var countCompletedOrders = orders.filter((order) => {
    return order.orderStatus == "Completed";
  }).length;

  // var countOnlinePay = orders.filter((order) => {
  //   return order.paymentIntent.payment_method_types[0] == "card";
  // }).length;

  // var countCOD = orders.filter((order) => {
  //   return order.paymentIntent.payment_method_types[0] == "cash";
  // }).length;

  // var countUnderShipping = orders.filter((order) => {
  //   return order.orderStatus !== "Completed";
  // }).length;

  const handleTotalOrders = () => {
    navigate("/admin/dashboard");
  };

  const handleTotalProducts = () => {
    navigate("/admin/products");
  };

  return (
    <div className="container-fluid pl-0 pt-4 mt-5 relative">
      <div className="row">
        <div className="col-md-2 pl-0">
          <AdminNav />
        </div>

        <div className="col">
          <h2 className=" text-left m-4 h3">
            <b>Admin Dahboard</b>
          </h2>
          <hr className="bg-info border-2 border-top border-info " />

          <div
            className="col-md-3  pt-5  m-5 bg-light"
            onClick={handleTotalOrders}
          >
            <div className="row">
              <div className="col-md-6 h4">
                <button
                  type="button"
                  className="text-light btn-lg opacity-0.7 rounded-full bg-info hover:drop-shadow-xl"
                >
                  <FaShoppingCart />
                </button>
              </div>
              <div className="col-md-6 text-right">
                <h4> {orders.length} </h4> Total Orders
              </div>
            </div>
            <div className="row bg-info mt-4 " style={{ height: "15px" }}>
              .
            </div>
          </div>

          <div
            className="col-md-3  pt-5  m-5 bg-light"
            onClick={() => navigate("/admin/users")}
          >
            <div className="row">
              <div className="col-md-6 h4">
                <button
                  type="button"
                  className="text-light btn-lg opacity-0.7 rounded-full bg-warning hover:drop-shadow-xl"
                >
                  <FaUserAlt />
                </button>
              </div>
              <div className="col-md-6 text-right">
                <h4> {users.length} </h4> Total Users
              </div>
            </div>
            <div className="row bg-warning mt-4" style={{ height: "15px" }}>
              .
            </div>
          </div>

          <div className="col-md-3  pt-5  m-5 bg-light">
            <div className="row">
              <div className="col-md-6 h4">
                <button
                  type="button"
                  className="text-light btn-lg opacity-0.7 rounded-full bg-danger hover:drop-shadow-xl"
                >
                  <FaRegChartBar />
                </button>
              </div>
              <div className="col-md-6 text-right">
                <h4> ${total / 100} </h4> Total Sales
              </div>
            </div>
            <div className="row bg-danger mt-4" style={{ height: "15px" }}>
              .
            </div>
          </div>

          {/* <div className="col-md-3 pt-5  m-5 bg-light">
            <div className="row">
              <div className="col-md-4 h4">
                <button
                  type="button"
                  className="text-light btn-lg opacity-0.9 rounded-full bg-info hover:drop-shadow-xl"
                >
                  <CreditCardOutlined />
                </button>
              </div>
              <div className="col-md-8 text-right">
                <h4> {countOnlinePay} </h4> Online Payments
              </div>
            </div>
            <div className="row bg-primary mt-4" style={{ height: "15px" }}>.</div>
          </div> */}

          {/* <div className="col-md-3 pt-5  m-5 bg-light ">
            <div className="row">
              <div className="col-md-4 h4">
                <button
                  type="button"
                  className="text-light btn-lg opacity-0.9 rounded-full bg-info hover:drop-shadow-xl"
                >
                  <MoneyCollectOutlined />
                </button>
              </div>
              <div className="col-md-8 text-right">
                <h4> {countCOD} </h4> Cash On Delivery
              </div>
            </div>
            <div className="row bg-secondary mt-4 " style={{ height: "15px" }}>.</div>
          </div> */}

          <div className="col-md-3 pt-5  m-5 bg-light">
            <div className="row">
              <div className="col-md-4 h4">
                <button
                  type="button"
                  className="text-light btn-lg opacity-0.7 rounded-full bg-success hover:drop-shadow-xl"
                >
                  <ScheduleOutlined />
                </button>
              </div>
              <div className="col-md-8 text-right">
                <h4>{countCompletedOrders}</h4> Completed Orders
              </div>
            </div>
            <div className="row bg-success mt-4" style={{ height: "15px" }}>
              .
            </div>
          </div>

          <div
            className="col-md-3 pt-5 m-5 bg-light"
            onClick={handleTotalProducts}
          >
            <div className="row">
              <div className="col-md-4 h4">
                <button
                  type="button"
                  className="text-light btn-lg opacity-0.7 rounded-full bg-primary hover:drop-shadow-xl"
                >
                  <FaBoxOpen />
                </button>
              </div>
              <div className="col-md-8 text-right">
                <h4>{products.length}</h4> Total Products
              </div>
            </div>
            <div className="row bg-primary mt-4" style={{ height: "15px" }}>
              .
            </div>
          </div>

          <hr className="bg-info border-2 border-top border-info " />
          <br />
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col-md-10">
            <AdminAnalytics sale={total} />
          </div>
        </div>

        <br />
      </div>
    </div>
  );
}

export default AdminMainDashboard;
