import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminNav from "../../components/nav/Adminnav";
import OrdersExcel from "./data/OrdersExcel";

import { toast } from "react-toastify";

import { listAllOrders, changeOrderStatus } from "../../functions/admin";
import { filterOrderByStaus } from "../../functions/user";

import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { IoIosMore } from "react-icons/io";
import { Tabs, Badge } from "antd";
const { TabPane } = Tabs;

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [dateFilter, setdateFilter] = useState("");
  const [radioChecked, setRadioChecked] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllOrders();
  }, []);

  const loadAllOrders = () =>
    listAllOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleDateFilter = (date) => {
    setRadioChecked(false);
    console.log("selected date", date);
    let fildate = new Date(date).toLocaleDateString();
    setdateFilter(fildate);
    console.log("edited from filter>>>>", fildate);

    const filOrders = orders.filter(
      (order) =>
        new Date(order.createdAt).toLocaleDateString() ===
        new Date(date).toLocaleDateString()
    );

    console.log("fil orders", filOrders);
    setOrders(filOrders);
  };

  const handleFilterByOrderStatus = (e) => {
    setRadioChecked(false);
    console.log("status filter", e.target.value);
    filterOrderByStaus(e.target.value).then((res) => {
      toast.success(e.target.value);
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
  };

  const handleFilterByPay = (e) => {
    setRadioChecked(true);
    console.log(e.target.value);
    const filOrders = orders.filter(
      (order) => e.target.value === order.paymentIntent.payment_method_types[0]
    );

    console.log(filOrders);
    setOrders(filOrders);
  };

  const handleOrderStatus = (orderId, orderStatus) => {
    changeOrderStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status Updated!!");
      loadAllOrders();
    });
  };

  const showOrderInTable = (order) => (
    <table className="table table-bordered ">
      <thead className="table-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleFilled className="text-success" />
              ) : (
                <CloseCircleOutlined className="text-danger" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container-fluid pl-0 pt-4 mt-5 relative">
      <div className="row">
        <div className="col-md-2 pl-0">
          <AdminNav />
        </div>

        <div className="col">
          <div className="m-2 md:m-10 mt-5 p-5 md:p-10 bg-light rounded-3xl">
           
              <h2 className=" text-left m-4 h2 mr-5">
                Orders
                <span className="p-1.5  cursor-pointer rounded-full text-white bg-info ml-2 h5">
                  {orders.length}
                </span>
              </h2>
              <div className="text-right" >
              <button
                className=" h6 font-semibold text-light pull-right"
              >
                <OrdersExcel/>
              </button>
              </div>
            
            <hr className="bg-info border-2 border-top border-info " />
            <br />

            <div className="form-group">
              <label>Date Wise Filter Product</label>
              <DatePicker
                className="form-control"
                onChange={(date) => handleDateFilter(date)}
                value={dateFilter}
              />

              <div className="flex mt-5">
                <div>
                  <label> Filter By Order Status </label>
                  <select
                    onChange={handleFilterByOrderStatus}
                    className="form-control p-1"
                  >
                    <option> select here </option>
                    <option value="Not Processed"> Not Processed </option>
                    <option value="Processing"> Processing </option>
                    <option value="Dispatched" className="text-warning">
                      Dispatched
                    </option>
                    <option value="Cancelled" className="text-danger">
                      Cancelled
                    </option>
                    <option value="Completed"> Completed </option>
                  </select>
                </div>

                <div className="ml-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value="card"
                      onChange={handleFilterByPay}
                      checked={radioChecked}
                    />
                    <label className="form-check-label" for="flexRadioDefault1">
                      Orders through Online Payment
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      value="cash"
                      onChange={handleFilterByPay}
                      checked={radioChecked}
                    />
                    <label class="form-check-label" for="flexRadioDefault2">
                      Orderd through Cash On Delivery
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* <div>
            <label> Filter By Order Status </label>
            <select
              onChange={handleFilterByOrderStatus}
              className="form-control p-1"
            >
              <option> select here </option>
              <option value="Not Processed"> Not Processed </option>
              <option value="Processing"> Processing </option>
              <option value="Dispatched" className="text-warning">
                Dispatched
              </option>
              <option value="Cancelled" className="text-danger">
                Cancelled
              </option>
              <option value="Completed"> Completed </option>
            </select>
          </div> */}

            {/* <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="card"
                onChange={handleFilterByPay}
                checked={radioChecked}
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Orders through Online Payment
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="cash"
                onChange={handleFilterByPay}
                checked={radioChecked}
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Orderd through Cash On Delivery
              </label>
            </div> */}

            <hr className="bg-info border-2 border-top border-info " />
            <br />

            {orders.map((order) => (
              <div key={order._id}>
                <Tabs type="card">
                  <TabPane tab="Order" key="4" className="mb-3">
                    <h4 className="display-7 pt-4 pb-4 jumbotron">
                      Order Id: {order.paymentIntent.id}
                      <span className="badge bg-info">{order.orderStatus}</span>
                    </h4>
                  </TabPane>

                  <TabPane tab="Order Info" key="2">
                    {showOrderInTable(order)}
                  </TabPane>

                  <TabPane tab="Payment Info" key="1" className="mb-3">
                    <ShowPaymentInfo order={order} />
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                        <h4 className="text-right text-info">
                          Update Delivery Status:{" "}
                        </h4>
                      </div>
                      <div className="col-md-8">
                        <select
                          onChange={(e) =>
                            handleOrderStatus(order._id, e.target.value)
                          }
                          className="form-control p-1"
                          defaultValue={order.orderStatus}
                        >
                          <option value="Not Processed"> Not Processed </option>
                          <option value="Processing"> Processing </option>
                          <option value="Dispatched" className="text-warning">
                            Dispatched
                          </option>
                          <option value="Cancelled" className="text-danger">
                            Cancelled
                          </option>
                          <option value="Completed"> Completed </option>
                        </select>
                      </div>
                    </div>
                    <br />
                  </TabPane>
                </Tabs>
              </div>
            ))}

            {/* <AllOrders orders={orders} handleOrderStatus={handleOrderStatus} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
