import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { listAllOrders } from "../../../functions/admin";

import {
  SparklineComponent,
  Inject,
  SparklineTooltip,
} from "@syncfusion/ej2-react-charts";

function SparkLine({ id, height, width, type }) {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllOrders();
  }, []);

  const loadAllOrders = () =>
    listAllOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  let jancom = 0;
  let febcom = 0;
  let marchcom = 0;
  let aprilcom = 0;
  let maycom = 0;
  let junecom = 0;
  let julycom = 0;
  let augcom = 0;
  let septcom = 0;
  let octcom = 0;
  let navcom = 0;
  let deccom = 0;

  var monthOrders = orders.map((order) => {
    if (new Date(order.createdAt).getMonth() + 1 == 1) {
      jancom = jancom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 2) {
      febcom = febcom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 3) {
      marchcom = marchcom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 4) {
      aprilcom = aprilcom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 5) {
      maycom = maycom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 6) {
      junecom = junecom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 7) {
      julycom = julycom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 8) {
      augcom = augcom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 9) {
      septcom = septcom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 10) {
      octcom = octcom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 11) {
      navcom = navcom + order.paymentIntent.amount;
    }
    if (new Date(order.createdAt).getMonth() + 1 == 12) {
      deccom = deccom + order.paymentIntent.amount;
    }
  });

  const SparklineAreaData = [
    { x: "Jan", yval: jancom },
    { x: "Feb", yval: febcom },
    { x: "March", yval: marchcom },
    { x: "April", yval: aprilcom },
    { x: "May", yval: maycom },
    { x: "June", yval: junecom },
    { x: "July", yval: julycom },
    { x: "August", yval: augcom },
    { x: "Sept", yval: septcom },
    { x: "Oct", yval: octcom },
    { x: "Nav", yval: navcom },
    { x: "Dec", yval: deccom },
  ];

  return (
    <SparklineComponent
      id={id}
      height={height}
      width={width}
      lineWidth={1}
      valueType="Numeric"
      fill="#f8f9fa"
      border={{ color: "#4DB6AC", width: 2 }}
      tooltipSettings={{
        visible: true,
        // eslint-disable-next-line no-template-curly-in-string
        format: "${x} : data ${yval}",
        trackLineSettings: {
          visible: true,
        },
      }}
      markerSettings={{ visible: ["All"], size: 2.5, fill: "black" }}
      dataSource={SparklineAreaData}
      xName="x"
      yName="yval"
      type={type}
    >
      <Inject services={[SparklineTooltip]} />
    </SparklineComponent>
  );
}

export default SparkLine;
