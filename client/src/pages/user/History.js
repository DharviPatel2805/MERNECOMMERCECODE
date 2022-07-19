import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserNav from "../../components/nav/UserNav";
import { listOrders } from "../../functions/user";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import Invoice from "../../components/order/Invoice";

import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons";

import { PDFDownloadLink } from "@react-pdf/renderer";

import { Tabs } from "antd";
const { TabPane } = Tabs;

function History() {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    listOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

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

  const showPDFLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="btn btn-block btn-outline-info b"
    >
      Download PDF
    </PDFDownloadLink>
  );

  // <PDFViewer>
  //     <Document>
  //       <Page size="A4" >
  //         <View>
  //           <Text>
  //             Section
  //           </Text>
  //         </View>
  //       </Page>
  //     </Document>
  //   </PDFViewer>

  // const showEachOrders = () =>
  //   orders.map((order, i) => (
  //     <div key={i} className="m-5 p-3 card">
  //       <ShowPaymentInfo order={order} />
  //       {showOrderInTable(order)}
  //       <div className="row">
  //         <div className="col"> {showPDFLink(order)} </div>
  //       </div>
  //     </div>
  //   ));

  return (
    <div className="container-fluid pl-0 pt-4 mt-5 relative">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>

        <div className="col text-center">
          {orders.length > 0 ? (
            <h4 className="text-center p-3 mt-4 mb-4 display-5 text-white jumbotron bgColor">
              User Purchase Orders
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-4 mb-4 display-7 jumbotron">
              No Purchase Order
            </h4>
          )}

          {/* {showEachOrders()} */}

          {orders.reverse().map((order, i) => (
            <div key={i} className="m-4 p-3 card">
              {/* <ShowPaymentInfo order={order} />
              {showOrderInTable(order)} */}

              <Tabs type="card">
                <TabPane tab="Payment Info" key="1" className="mb-3">
                  <ShowPaymentInfo order={order} />
                </TabPane>
                <TabPane tab="Order Info" key="2">
                  {showOrderInTable(order)}
                </TabPane>
                <TabPane tab="Download Order Invoice" key="3">
                  <div className="row">
                    <div className="col"> {showPDFLink(order)} </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
