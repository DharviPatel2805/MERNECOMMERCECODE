import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listAllOrders } from "../../../functions/admin";

import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const OrdersExcel = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllOrders();
  }, []);

//   const productTitle = [];
//   orders.map((order) => order.products.map((p) => console.log(p.product.title) ));

  const DataSet = [
    {
      columns: [
        {
          title: "Order ID",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 200 },
          height: { wpx: 30 },
        }, // width in pixels
        {
          title: "Ordered BY",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 200 },
          height: { wpx: 30 },
        }, // width in pixels
        {
          title: "Products Count",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 200 },
          height: { wpx: 30 },
        }, // width in characters
        // {
        //   title: "Products Name",
        //   style: { font: { sz: "18", bold: true } },
        //   width: { wpx: 200 },
        // height: { wpx: 30 },
        // }, // width in pixels
        {
          title: "Total Amount",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 200 },
          height: { wpx: 30 },
        }, // width in pixels
        {
          title: "Payment Method",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 200 },
          height: { wpx: 30 },
        }, // width in pixels
        {
          title: "Order Status",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 200 },
          height: { wpx: 30 },
        }, // width in pixels
        {
          title: "Ordered On",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 200 },
          height: { wpx: 30 },
        }, // width in pixels
      ],
      data: orders.map((order) => [
        { value: order._id, style: { font: { sz: "14" } } },
        { value: order.orderedBy, style: { font: { sz: "14" } } },
        { value: order.products.length, style: { font: { sz: "14" } } },
        // { value: order.products.map((p) => p.product.title ), style: { font: { sz: "14" } } },
        { value: order.paymentIntent.amount, style: { font: { sz: "14" } } },
        {
          value: order.paymentIntent.payment_method_types[0],
          style: { font: { sz: "14" } },
        },
        { value: order.orderStatus, style: { font: { sz: "14" } } },
        { value: order.createdAt, style: { font: { sz: "14" } } },
      ]),
    },
  ];

  const loadAllOrders = () =>
    listAllOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  return (
    <div>
      {orders.length && (
        <ExcelFile
          filename="Orders Report"
          element={
            <button
              type="button"
              className="btn btn-lg text-light"
              style={{ borderRadius: "10px", backgroundColor: "#4DB6AC" }}
            >
              Download Report
            </button>
          }
        >
          <ExcelSheet dataSet={DataSet} name="Orders Report" />
        </ExcelFile>
      )}
    </div>
  );
};

export default OrdersExcel;
