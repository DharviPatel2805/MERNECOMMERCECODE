import React from "react";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons";

import { Tabs } from "antd";
const { TabPane } = Tabs;

function AllOrders({ orders, handleOrderStatus }) {
  return (
    <div>
      <Tabs type="card">
        <TabPane tab="Payment Info" key="1" className="mb-5 ">
          <div className="bg-light">
            {orders.map((order) => (
              <div key={order._id}>
                <ShowPaymentInfo order={order} />

                <div className="row">
                  <div className="col-md-4">
                    <h4 className="text-right" >Update Delivery Status: </h4>
                  </div>
                  <div className="col-md-8">
                    <select
                      onChange={(e) =>
                        handleOrderStatus(order._id, e.target.value)
                      }
                      className="form-control"
                    >
                      <option value="Not Processed"> Not Processed </option>
                      <option value="Processing"> Processing </option>
                      <option value="Dispatched"> Dispatched </option>
                      <option value="Cancelled"> Cancelled </option>
                      <option value="Completed"> Completed </option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPane>

        <TabPane tab="Change Delivery Status" key="2">
          <div className="row">
            <div className="col">Delivery Status</div>
          </div>
        </TabPane>

        <TabPane tab="Order Info" key="3">
          {/* {showOrderInTable(order)} */}
          *************
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AllOrders;
